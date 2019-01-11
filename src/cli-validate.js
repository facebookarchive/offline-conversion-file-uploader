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

const configUtils = require('./utils/configUtils');
const fs = require('fs');
const graphAPIUtils = require('./utils/graphAPIUtils');
const initConfig = require('./utils/initConfig');
const initLogger = require('./utils/initLogger');
const reportUtils = require('./utils/reportUtils');
const SignalsUploaderLibrary = require('./uploader/SignalsUploaderLibrary');
const winston = require('winston');

const {graphAPI, setupGraphAPIVersion} = graphAPIUtils;
const {
  SignalsDSDITestUploadUtils,
  SignalsDSDITestUploadWarnings,
  SignalsEventDataSchema,
  SignalsUploaderPreviewV2Task,
} = SignalsUploaderLibrary;
const {getTestUploadResult} = SignalsDSDITestUploadUtils;
const {
  getWarningsFromTestUploadResult,
  IssueCheckers,
} = SignalsDSDITestUploadWarnings;
const {
  formatPercentage,
  printHeader,
  printInvalidSamples,
  printLine,
  printReportTime,
  printWarning,
  EOL,
} = reportUtils;
const {
  checkAccessTokenAndEnt,
  fetchSamplesAndCheckConfigForRawEventData,
} = configUtils;

const TEST_UPLOAD_DOC_URL =
  'https://www.facebook.com/business/help/184554988773121';

const COMMAND = 'validate';

async function main() {
  const config = initConfig.loadConfigOrExit(initConfig.OPTIONS_FOR_VALIDATE);
  initLogger(
    config.logging,
    COMMAND,
    config.inputFilePath,
    config.disableLogging,
  );
  winston.info('Config and logger initialized.');

  await setupGraphAPIVersion(config.accessToken, config.apiVersion);
  await fetchSamplesAndCheckConfigForRawEventData(config);
  await checkAccessTokenAndEnt(
    config.accessToken,
    config.dataSetID,
    'dataSetID',
  );

  const normalizerSettings = {
    schema: SignalsEventDataSchema,
    mapping: config.mapping,
    infoForNormalization: config.format,
    customTypeInfo: config.customTypeInfo,
  };

  const task = new SignalsUploaderPreviewV2Task(
    config.inputFilePath,
    config.delimiter,
    normalizerSettings,
    config.presetValues,
    {
      type: 'advanced',
      maxNumInvalidSamples: config.numRowsToValidate,
    },
    config.numRowsToValidate,
    config.header,
    64 * 1024, // Chunk size.
    16, // Max num chunks in buffer.
    null, // Logger not used.
  );

  let previewResult;
  try {
    previewResult = await task.run();
  } catch (error) {
    winston.error(`Local validate failed with error: ${error}`);
    process.exit(1);
    throw error;
  }
  winston.info('Local validation done.');

  let validateResult;
  try {
    validateResult = await graphAPI(
      `${config.dataSetID}/validate`,
      'POST',
      {
        access_token: config.accessToken,
        data: previewResult.normalizedRows,
        namespace_id: config.namespaceID,
      },
    );
  } catch (error) {
    winston.error(`Remote validate failed with error: ${error}`);
    process.exit(1);
  }
  winston.info('Remote validation done.');

  const testUploadResult = getTestUploadResult(
    previewResult.numRowsProcessed,
    normalizerSettings,
    previewResult.errorReport,
    validateResult,
  );
  const {warnings, errors} = getWarningsFromTestUploadResult(
    testUploadResult,
    IssueCheckers,
  );

  const stream = fs.createWriteStream(config.reportOutputPath);
  stream.once('open', () => {
    printHeader(stream, 'Validation Report');
    stream.write(`Offline Event Set ID: ${config.dataSetID}` + EOL);
    stream.write(`Input File: ${config.inputFilePath}` + EOL);
    printReportTime(stream);
    stream.write(EOL + EOL);

    printHeader(stream, 'Overall');
    stream.write(`Num Rows Validated: ${previewResult.numRowsProcessed}` + EOL);
    stream.write(
      `Num Accepted Rows: ${validateResult.total_validated_count}` + EOL,
    );
    stream.write(`Num Matched Rows: ${validateResult.match_count}` + EOL);
    stream.write(`Estimated Accept Rate: ${formatPercentage(
      validateResult.total_validated_count,
      previewResult.numRowsProcessed,
    )}` + EOL);
    stream.write(`Estimated Match Rate: ${formatPercentage(
      validateResult.match_count,
      validateResult.total_validated_count,
    )}` + EOL);
    stream.write(EOL + EOL);

    const totalWarnings = errors.length + warnings.length;
    if (totalWarnings > 0) {
      printLine(stream,
        `We've detected the following issues with your file. Please
        review prior to uploading your data.`
      );
      printLine(stream,
        `Learn more about troubleshooting offline upload issues:
        ${TEST_UPLOAD_DOC_URL}`
      );
      stream.write(EOL + EOL);
    }

    errors.forEach(error => printWarning(stream, error, 'ERROR'));
    warnings.forEach(warning => printWarning(stream, warning, 'WARNING'));

    const samples = previewResult.errorReport.invalidSamples;
    printInvalidSamples(stream, samples, config.mapping);

    stream.end();
  });
  winston.info(`Validation result saved to: ${config.reportOutputPath}`);
}

main();
