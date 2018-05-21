/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */

'use strict';

const fs = require('fs');
const graphAPI = require('./graphAPI');
const reportUtils = require('./reportUtils');
const SignalsUploaderLibrary = require('../uploader/SignalsUploaderLibrary');
const winston = require('winston');

const {
  OfflineStandardEventsEnum,
  getSignalsSchemaSummary,
  SignalDateFormats,
  SignalsCurrencyCodes,
  SignalsEventDataSchema,
  SignalsHashedEventDataSchema,
  SignalsUploaderPreviewV2Task,
  SignalsUploaderSampleFetchTask,
  SignalTimestampFormats,
} = SignalsUploaderLibrary;

const {
  EOL,
  printAggregatedError,
  printConfig,
  printInvalidSamples,
  printLine,
} = reportUtils;

type SignalsSchemaSummary = {
  id: ?string,
  additionalInfoURL?: string,
  allSimplePropKeysInSchema: Array<string>,
  noUISimplePropKeysInSchema: Array<string>,
  exampleFiles?: Object,
  extraPropsCollectors: Array<string>,
  keysForSimplePropsTypesInSchema: Object,
  pathForSimplePropKeys: Object,
  schemasForSimplePropsInSchema: Object,
  typesForSimplePropKeys: Object,
  typesForSimplePropPaths: Object,
  keysForSimplePropPaths: Object,
  keysForSubschemasWithID: Object,
  piiKeys: Array<string>,
  subschemasByType: Object,
};

const {VALID_CURRENCY_CODES} = SignalsCurrencyCodes;
const VALID_CUSTOM_BASE_TYPES = ['number', 'text'];

function isCustomData(propPath: string) {
  return propPath.startsWith('custom_data');
}

function checkUnknownMapping(
  mapping: {[string]: string},
  schemaSummary: SignalsSchemaSummary,
): void {
  Object.keys(mapping).forEach(column => {
    const propPath = mapping[column];
    if (typeof propPath !== 'string') {
      throw new Error(`Invalid mapping on column ${column}, string expected.`);
    }
    const key = schemaSummary.keysForSimplePropPaths[propPath];
    if (key == null && !isCustomData(propPath)) {
      throw new Error(`Unknown mapping '${propPath}' on column ${column}.`);
    }
  });
}

function checkTooManyMapping(
  mapping: {[string]: string},
  schemaSummary: SignalsSchemaSummary,
): void {
  const cols = {};
  Object.keys(mapping).forEach(column => {
    const propPath = mapping[column];
    cols[propPath] = [...(cols[propPath] || []), column];
  });

  Object.keys(cols).forEach(propPath => {
    let maxOccurrence = 1;
    if (!isCustomData(propPath)) {
      const propKey = schemaSummary.keysForSimplePropPaths[propPath];
      const propSchema = schemaSummary.schemasForSimplePropsInSchema[propKey];
      maxOccurrence = (propSchema && propSchema.maxOccurrence) || 1;
    }
    if (cols[propPath].length > maxOccurrence) {
      throw new Error(
        `'${propPath}' can be mapped to at most ${maxOccurrence} column(s). `
        + `Currently, it's mapped to column: ${cols[propPath].join(', ')}.`
      );
    }
  });
}

function checkInvalidCustomDataMapping(
  mapping: {[string]: string},
): void {
  Object.keys(mapping).forEach(column => {
    const propPath = mapping[column];
    if (isCustomData(propPath)) {
      const parts = propPath.split('.');
      if (
        parts.length !== 2
        || parts[1].length === 0
        || parts[1].trim() !== parts[1]
      ) {
        throw new Error(`Invalid custom data field '${propPath}'.`);
      }
    }
  });
}

function checkIndexOfMapping(
  mapping: {[string]: string},
  samples: Array<Array<?string>>,
): void {
  const numColumns = samples.length;
  Object.keys(mapping).forEach(column => {
    const columnInNum = parseInt(column, 10);
    if (
      String(columnInNum) !== String(column) ||
      columnInNum < 0 ||
      columnInNum >= numColumns ||
      !Number.isInteger(columnInNum)
    ) {
      throw new Error(`Index ${column} is invalid for mapping.`);
    }
  });
}

function checkMissingMapping(
  mapping: {[string]: string},
  samples: Array<Array<?string>>,
  presetValues: {event_name?: ?string, currency?: ?string},
): void {
  // Check event_name.
  if (
    !Object.values(mapping).includes('event_name')
    && presetValues.event_name == null
  ) {
    throw new Error(
      'No column is mapped to event_name, '
      + 'please either map it or set it presetValues.',
    );
  }

  if (!Object.values(mapping).includes('event_time')) {
    throw new Error('A column must be mapped to event_time.');
  }

  // Check value and currency.
  let existPurchaseEvent = presetValues.event_name
    && presetValues.event_name === 'Purchase';
  const purchaseColumn = Object.keys(mapping)
    .find(column => mapping[column] === 'event_name');
  if (purchaseColumn != null && !existPurchaseEvent) {
    const purchaseColumnIndex = parseInt(purchaseColumn, 10);
    existPurchaseEvent = (samples[purchaseColumnIndex] || [])
      .some(field => field != null && field.toLowerCase() === 'purchase');
  }
  const isValueMapped = Object.values(mapping).includes('value');
  if (existPurchaseEvent && !isValueMapped) {
    throw new Error(
      'A column must be mapped to value when there are purchase events.',
    );
  }
  const isCurrencyMapped = Object.values(mapping).includes('currency')
    || presetValues.currency != null;
  if (isCurrencyMapped && !isValueMapped) {
    throw new Error(
      'A column must be mapped to value when currency is mapped or preset.',
    );
  }
  if (isValueMapped && !isCurrencyMapped) {
    throw new Error(
      'A column must be mapped to currency when value is mapped.',
    );
  }

  // Check content_id and content_type.
  const isContentIDMapped = Object.values(mapping).includes('content_ids');
  const isContentTypeMapped = Object.values(mapping).includes('content_type');
  if (isContentIDMapped && !isContentTypeMapped) {
    throw new Error(
      'A column must be mapped to content_type when content_ids is mapped.',
    );
  }
  if (isContentTypeMapped && !isContentIDMapped) {
    throw new Error(
      'A column must be mapped to content_ids when content_type is mapped.',
    );
  }
}

function checkPresetValues(
  mapping: {[string]: string},
  presetValues: Object,
): void {
  Object.keys(presetValues).forEach(propPath => {
    if (propPath === 'event_name') {
      // check event_name
      if (Object.values(mapping).includes('event_name')) {
        throw new Error(
          '\'event_name\' is already mapped, it should not be in presetValues.',
        );
      }
      const value = presetValues[propPath];
      if (!Object.values(OfflineStandardEventsEnum).includes(value)) {
        throw new Error(
          `Invalid value '${value}' for 'presetValues.event_name', acceptable `
          + `event_name: ${Object.values(OfflineStandardEventsEnum).join(', ')}.`
        );
      }
    } else if (propPath === 'currency') {
      // check currency
      if (Object.values(mapping).includes('currency')) {
        throw new Error(
          '\'currency\' is already mapped, it should not be in presetValues.',
        );
      }
      const value = presetValues[propPath];
      if (!Object.values(VALID_CURRENCY_CODES).includes(value)) {
        throw new Error(
          `Invalid value '${value}' for 'presetValues.currency', acceptable `
          + `currency: ${Object.values(VALID_CURRENCY_CODES).join(', ')}.`
        );
      }
    } else {
      throw new Error(`Unsupported key ${propPath} in presetValues.`);
    }
  });
}

function checkCustomTypeInfo(
  mapping: {[string]: string},
  customTypeInfo: Object,
): void {
  const customKeys = new Set();
  Object.keys(mapping).forEach(column => {
    const propPath = mapping[column];
    if (!isCustomData(propPath)) {
      return;
    }
    const parts = propPath.split('.');
    if (parts.length === 2) {
      const key = parts[1];
      customKeys.add(key);
      if (customTypeInfo[key] == null) {
        throw new Error(
          `A column is mapped to '${propPath}', `
          + `please specify its baseType in 'customTypeInfo.${key}'.`,
        );
      }
    }
  });
  Object.keys(customTypeInfo).forEach(key => {
    if (!customKeys.has(key)) {
      throw new Error(
        `Invalid key '${key}' for customTypeInfo, `
        + `no column mapped to 'custom_data.${key}'.`,
      );
    }
    const info = customTypeInfo[key];
    if (info == null || typeof info !== 'object') {
      throw new Error(
        `Invalid value for 'customTypeInfo.${key}', it should be an object.`,
      );
    }
    if (!VALID_CUSTOM_BASE_TYPES.includes(info.baseType)) {
      throw new Error(
        `Invalid baseType '${info.baseType}' for 'customTypeInfo.${key}', `
        + 'it should be \'text\' or \'number\'.',
      );
    }
  });
}

function checkInfoForNormalization(
  mapping: {[string]: string},
  infoForNormalization: Object,
): void {
  // check dob
  if (Object.values(mapping).includes('match_keys.dob')) {
    const format = infoForNormalization.dob;
    if (format == null) {
      throw new Error(
        'Please specify format of \'match_keys.dob\' in '
        + '\'infoForNormalization.dob\', acceptable formats are: '
        + `${SignalDateFormats.join(', ')}.`
      );
    }
    if (!SignalDateFormats.includes(format)) {
      throw new Error(
        `Unsupported format '${format}' for infoForNormalization.dob, `
        + `acceptable formats are: ${SignalDateFormats.join(', ')}.`,
      );
    }
  }

  // check event_time
  const eventTimeInfo = infoForNormalization.event_time;
  if (eventTimeInfo == null || typeof eventTimeInfo !== 'object') {
    throw new Error(
      'Invalid or missing \'infoForNormalization.event_time\', '
      + 'should be an object.',
    );
  }
  const timeZone = eventTimeInfo.timeZone;
  if (
    timeZone != null
    && !(
      typeof timeZone === 'number'
      && timeZone >= -12
      && timeZone <= 14
    )
  ) {
    throw new Error(
      `Invalid timeZone '${timeZone}' for 'infoForNormalization.event_time', `
      + 'should be a number between -12 to 14.',
    );
  }
  const timeFormat = eventTimeInfo.timeFormat;
  if (timeFormat == null) {
    throw new Error(
      'Please specify format of \'event_time\' in '
      + '\'infoForNormalization.event_time.timeFormat\', acceptable formats are: '
      + `${SignalTimestampFormats.join(', ')}.`
    );
  }
  if (!SignalTimestampFormats.includes(timeFormat)) {
    throw new Error(
      `Unsupported format '${timeFormat}' `
      + 'for \'infoForNormalization.event_time\', '
      + `acceptable formats are: ${SignalTimestampFormats.join(', ')}.`,
    );
  }
}

function checkConfigForRawEventData(
  samples: Array<Array<?string>>,
  header: boolean,
  mapping: {[string]: string},
  infoForNormalization: {[string]: any},
  customTypeInfo: {[string]: {baseType: string}},
  presetValues: {event_name?: ?string, currency?: ?string},
): void {
  const samplesWithoutHeader = samples.map(col => col.slice(header ? 1 : 0));
  const schemaSummary = getSignalsSchemaSummary(SignalsEventDataSchema);

  checkIndexOfMapping(mapping, samples);
  checkUnknownMapping(mapping, schemaSummary);
  checkTooManyMapping(mapping, schemaSummary);
  checkInvalidCustomDataMapping(mapping);
  checkMissingMapping(mapping, samplesWithoutHeader, presetValues);
  checkPresetValues(mapping, presetValues);
  checkCustomTypeInfo(mapping, customTypeInfo);
  checkInfoForNormalization(mapping, infoForNormalization);
}

const NUM_SAMPLE_ROWS_TO_VERIFY_CONFIG = 1000;

async function fetchSamples(config: Object) {
  // Fetch some samples.
  const sampleFetchTask = new SignalsUploaderSampleFetchTask(
    config.inputFilePath,
    config.delimiter,
    NUM_SAMPLE_ROWS_TO_VERIFY_CONFIG, // num samples
    64 * 1024, // chunk size
    24, // max num chunks in buffer
    null, // logger not used by MDFU.
  );
  let sampleFetchResult;
  try {
    sampleFetchResult = await sampleFetchTask.run();
  } catch (error) {
    winston.error(`Sample fetch failed with error: ${error}`);
    process.exit(1);
    throw error; // make flow happy
  }
  return sampleFetchResult.samples;
}

async function fetchSamplesAndCheckConfigForRawEventData(config: Object) {
  const samples = await fetchSamples(config);
  try {
    checkConfigForRawEventData(
      samples,
      config.header,
      config.mapping,
      config.format,
      config.customTypeInfo,
      config.presetValues,
    );
  } catch (error) {
    winston.error(`Invalid config: ${error}`);
    process.exit(1);
  }
}

const STOP_THRESHOLD = 0.1;

async function validateSampleRowsAndStopIfTooManyErrors(
  schema: Object,
  config: Object,
) {
  // Normalize some sample rows to see correct rate.
  const previewTask = new SignalsUploaderPreviewV2Task(
    config.inputFilePath,
    config.delimiter,
    {
      schema,
      mapping: config.mapping,
      infoForNormalization: config.format,
      customTypeInfo: config.customTypeInfo,
    },
    config.presetValues,
    {
      type: 'advanced',
      maxNumInvalidSamples: NUM_SAMPLE_ROWS_TO_VERIFY_CONFIG,
    },
    NUM_SAMPLE_ROWS_TO_VERIFY_CONFIG,
    config.header,
    64 * 1024, // Chunk size.
    16, // Max num chunks in buffer.
    null, // Logger not used.
  );
  let previewResult;
  try {
    previewResult = await previewTask.run();
  } catch (error) {
    winston.error(`Preview failed with error: ${error}`);
    process.exit(1);
    throw error;
  }

  const numRowsWithError = previewResult.errorReport.invalidSamples.length;
  const numProcessedRows = previewResult.numRowsProcessed;
  if (numRowsWithError <= numProcessedRows * STOP_THRESHOLD) {
    // Acceptable error rate. Pass.
    return true;
  }
  const abortMessage =
    `ABORTED because more than ${STOP_THRESHOLD * 100}% of the first `
    + `${numProcessedRows} rows have errors.`;
  winston.error(abortMessage);
  if (config.ignoreSampleErrors) {
    return true;
  }

  const stream = fs.createWriteStream(config.reportOutputPath);
  stream.once('open', () => {
    printLine(stream, abortMessage);
    stream.write(EOL);
    printConfig(stream, 'ABORTED', config);
    printAggregatedError(
      stream,
      previewResult.errorReport,
      config.mapping,
    );
    printInvalidSamples(
      stream,
      previewResult.errorReport.invalidSamples,
      config.mapping,
    );
    stream.end();
  });
  winston.info(`Report saved to: ${config.reportOutputPath}`);
  return false;
}

function deriveMappingAndCustomTypeInfo(
  firstLine: Array<?string>,
): {
  mapping: {[string]: string},
  customTypeInfo: {[string]: {baseType: 'text' | 'number'}}
} {
  const mapping = {};
  const customTypeInfo = {};
  firstLine.forEach((header, column) => {
    if (header == null) {
      throw new Error('Invalid header for preprocessed data.');
    }
    if (isCustomData(header)) {
      const indexOfColon = header.lastIndexOf(':');
      if (indexOfColon < 0) {
        throw new Error(
          `Custom data field '${header}' does not have a type, please use `
          + `either '${header}:text' or '${header}:number'.`,
        );
      }
      const customDataField = header.substring(0, indexOfColon);
      const typeField = header.substring(indexOfColon + 1);
      const customDataKey = customDataField
        .substring(customDataField.indexOf('.') + 1);
      mapping[String(column)] = customDataField;
      customTypeInfo[customDataKey] = {baseType: typeField};
    } else {
      mapping[String(column)] = header;
    }
  });
  return {mapping, customTypeInfo};
}

function checkAndDeriveConfigForPreprocessedEventData(
  samples: Array<Array<?string>>,
): {
  mapping: {[string]: string},
  customTypeInfo: {[string]: {baseType: 'text' | 'number'}}
} {
  const {mapping, customTypeInfo} = deriveMappingAndCustomTypeInfo(
    samples.map(col => col[0]),
  );

  const samplesWithoutHeader = samples.map(col => col.slice(1));
  const schemaSummary = getSignalsSchemaSummary(SignalsHashedEventDataSchema);

  checkIndexOfMapping(mapping, samples);
  checkUnknownMapping(mapping, schemaSummary);
  checkTooManyMapping(mapping, schemaSummary);
  checkInvalidCustomDataMapping(mapping);
  checkMissingMapping(mapping, samplesWithoutHeader, {});
  checkCustomTypeInfo(mapping, customTypeInfo);

  return {mapping, customTypeInfo};
}

async function checkAccessTokenAndEnt(
  accessToken: string,
  entID: string,
  entKey: string,
  fields: Array<string> = ['id'],
): Promise<Object> {
  try {
    return await graphAPI(
      entID,
      'GET',
      {
        access_token: accessToken,
        fields,
      },
    );
  } catch (error) {
    winston.error(
      `Failed to read ${entID} using access token ${accessToken}. `
      + `Please make sure ${entKey} and accessToken are setup properly. `
      + 'Also, network or firewall issues may also cause the error. '
      + 'Please make sure your network is connected and whitelist Facebook '
      + 'API server IPs in your firewall settings. Use '
      + '`whois -h whois.radb.net -- \'-i origin AS32934\' | grep ^route` '
      + 'to list all Facebook IPs.'
    );
    process.exit(1);
    throw error;
  }
}

module.exports = {
  checkAccessTokenAndEnt,
  checkAndDeriveConfigForPreprocessedEventData,
  checkConfigForRawEventData,
  fetchSamples,
  fetchSamplesAndCheckConfigForRawEventData,
  validateSampleRowsAndStopIfTooManyErrors,
};
