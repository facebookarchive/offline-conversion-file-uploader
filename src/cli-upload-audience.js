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

const batchSenders = require('./utils/batchSenders');
const configUtils = require('./utils/configUtils');
const fs = require('fs');
const graphAPIUtils = require('./utils/graphAPIUtils');
const initConfig = require('./utils/initConfig');
const initLogger = require('./utils/initLogger');
const path = require('path');
const reportUtils = require('./utils/reportUtils');
const SignalsUploaderLibrary = require('./uploader/SignalsUploaderLibrary');
const winston = require('winston');

const {graphAPI, setupGraphAPIVersion} = graphAPIUtils;
const {
  SignalsBasicPIISchema,
  SignalsWLALExtendedPIISchema,
  SignalsUploaderUploadTask,
} = SignalsUploaderLibrary;
const {
  printAggregatedError,
  printConfig,
  printInvalidSamples,
  printOverviewForUpload,
} = reportUtils;
const {
  checkAccessTokenAndEnt,
  validateSampleRowsAndStopIfTooManyErrors,
} = configUtils;

const COMMAND = 'upload-audience';
const UINT_MAX = 4294967296;
const CUSTOMER_FILE_SOURCE_HELP = 'https://developers.facebook.com/ads/blog/post/2018/06/13/sharing-custom-audiences/';

async function main() {
  const config = initConfig.loadConfigOrExit(initConfig.OPTIONS_FOR_UPLOAD_AUDIENCE);
  initLogger(
    config.logging,
    COMMAND,
    config.inputFilePath,
    config.disableLogging,
  );
  winston.info('Config and logger initialized.');

  await setupGraphAPIVersion(config.accessToken, config.apiVersion);

  const isValueBased = Object.values(config.mapping)
    .includes('lookalike_value');
  // For value-based custom audience, all match keys should have 'match_keys'
  // prefix.
  // For non-value-based custom audience, all match keys should not have
  // 'match_keys' prefix.
  Object.keys(config.mapping).forEach(key => {
    const propPath = config.mapping[key];
    if (propPath === 'lookalike_value') {
      return;
    }
    const hasMatchKeysPrefix = propPath.startsWith('match_keys.');
    if (hasMatchKeysPrefix && !isValueBased) {
      config.mapping[key] = propPath.substring('match_keys.'.length);
    } else if (!hasMatchKeysPrefix && isValueBased) {
      config.mapping[key] = 'match_keys.' + propPath;
    }
  });

  const schema = isValueBased
    ? SignalsWLALExtendedPIISchema
    : SignalsBasicPIISchema;

  const shouldContinue = await validateSampleRowsAndStopIfTooManyErrors(
    schema,
    config,
  );
  if (!shouldContinue) {
    return;
  }

  // Init audienceID.
  let {
    adAccountID,
    customAudienceID,
    customerFileSource,
    removeUsers,
    retentionDays,
  } = config;

  if (customerFileSource == null) {
    winston.warn(
      'Please set customerFileSource. Learn more at: '
      + CUSTOMER_FILE_SOURCE_HELP,
    );
  }

  // Create an audience under ad account if customAudienceID is not specified.
  if (customAudienceID == null) {
    if (removeUsers) {
      winston.error('customAudienceID must be specified when removing users.');
      process.exit(1);
    }

    if (adAccountID == null) {
      winston.error('Neither customAudienceID nor adAccountID is specified.');
      process.exit(1);
    }

    await checkAccessTokenAndEnt(
      config.accessToken,
      `act_${adAccountID}`,
      'adAccountID',
    );

    try {
      const name = path.basename(config.inputFilePath);
      const createAudienceResult = await graphAPI(
        `act_${adAccountID}/customaudiences`,
        'POST',
        {
          access_token: config.accessToken,
          name,
          subtype: 'CUSTOM',
          is_value_based: isValueBased,
          customer_file_source: customerFileSource,
          retention_days: retentionDays,
        },
      );
      customAudienceID = createAudienceResult.id;
      winston.info(
        `Created audience ID ${customAudienceID} with name '${name}'.`
      );
    } catch (error) {
      winston.error(
        'Failed to create audience for ad account' +
        ` ${adAccountID}: ${error}`
      );
      process.exit(1);
    }
  } else {
    const fieldsToCheck = ['id', 'is_value_based', 'retention_days'];
    if (customerFileSource != null) {
      fieldsToCheck.push('customer_file_source');
    }

    const existingAudience = await checkAccessTokenAndEnt(
      config.accessToken,
      customAudienceID,
      'customAudienceID',
      fieldsToCheck,
    );

    if (
      existingAudience.is_value_based !== isValueBased
      && !(
        !isValueBased
        && existingAudience.is_value_based
        && removeUsers
      )
    ) {
      const audienceIsValueBased = existingAudience.is_value_based
        ? 'value-based'
        : 'not value-based';
      const schemaIsValueBased = isValueBased
        ? 'value-based'
        : 'not value-based';
      winston.error(
        `The audience specified by customAudienceID is ${audienceIsValueBased},`
        + ` while the schema specified by mapping is ${schemaIsValueBased}.`,
      );
      process.exit(1);
    }

    if (adAccountID != null) {
      winston.warn(`AdAccountID ${adAccountID} specified but not used.`);
    }

    if (
      customerFileSource != null
      && existingAudience.customer_file_source !== customerFileSource
    ) {
      winston.info(
        'The audience is using customer_file_source '
        + `${existingAudience.customer_file_source}, will update to `
        + `${customerFileSource} specified by customerFileSource.`,
      );
      await graphAPI(
        customAudienceID,
        'POST',
        {
          access_token: config.accessToken,
          customer_file_source: customerFileSource,
        },
      );
      winston.info(
        `Successfully set customer_file_source to ${customerFileSource}.`,
      );
    }

    if (existingAudience.retention_days !== retentionDays) {
      winston.info(
        'The audience is using retention_days='
        + `${existingAudience.retention_days}, will update to `
        + `${retentionDays} specified by retentionDays.`,
      );
      await graphAPI(
        customAudienceID,
        'POST',
        {
          access_token: config.accessToken,
          retention_days: retentionDays,
        },
      );
      winston.info(
        `Successfully set retention_days to ${retentionDays}.`,
      );
    }
  }

  const sessionID = Math.floor(Math.random() * UINT_MAX);

  const {
    batchSender,
    lastDummyBatchSender,
  } = batchSenders.getCustomAudienceBatchSender(
    config.accessToken,
    customAudienceID,
    sessionID,
    config.mapping,
    removeUsers ? 'DELETE' : 'POST',
    config.appIDs || null,
    config.pageIDs || null,
  );

  let latestProgress = null;

  const task = new SignalsUploaderUploadTask(
    config.inputFilePath,
    config.delimiter,
    {
      schema,
      mapping: config.mapping,
      infoForNormalization: config.format,
      customTypeInfo: {}, // Not needed for custom audience upload.
    },
    {}, // presetValues, not needed for custom audience upload.
    [], // progressRanges, not suppported for custom audience upload.
    {
      type: 'advanced',
      maxNumInvalidSamples: 1000,
    }, // error config
    config.batchSize, // num rows per batch
    config.header, // header
    64 * 1024, // chunk size
    64, // max num chunks in buffer
    24, // max num batches in buffer
    12, // max num batches sending in parallel
    1, // concurrrent normalizers, not supported in MDFU.
    batchSender,
    batchSenders.shouldIgnoreAPIErrorFn, // TODO
    10, // num retries for API error
    15 * 1000, // retry interval for API error
    100, // num retries for network error
    3 * 1000, // retry interval for network error
    progress => {
      latestProgress = progress;
    },
    offline => {
      if (offline) {
        winston.warn('Network offline.');
      } else {
        winston.warn('Network back online.');
      }
    },
    null // logger, not used for MDFU.
  );

  const startTime = Date.now();

  const intervalHandler = setInterval(() => {
    const progress = latestProgress
      ? latestProgress.estimatedProgress
      : 0;
    winston.verbose(`Progress: ${(progress * 100).toFixed(2)}%`);
  }, 5000);

  let uploadResult;
  try {
    uploadResult = await task.run();
    await lastDummyBatchSender();
    const uploadTime = ((Date.now() - startTime) / 1000).toFixed(2);
    winston.info('Upload finished.');
    winston.info(
      removeUsers
        ? 'Users in the file will be removed from the custom audience.'
        : 'Users in the file will be added to the custom audience.',
    );
    winston.info(`Time elapsed: ${uploadTime} seconds.`);

    const {progress} = uploadResult;
    winston.info(`Num rows uploaded: ${progress.numRowsUploaded}.`);
    if (progress.numRowsFailedToNormalize > 0) {
      winston.warn(
        `${progress.numRowsFailedToNormalize} rows skipped `
        + 'because they are invalid.');
    }
    if (progress.numRowsFailedToUpload > 0) {
      winston.warn(`${progress.numRowsFailedToUpload} rows skipped `
        + 'because of API error.');
    }
  } catch (error) {
    winston.error(`Upload failed with error: ${error}`);
    process.exit(1);
  }
  clearInterval(intervalHandler);

  const stream = fs.createWriteStream(config.reportOutputPath);
  stream.once('open', () => {
    printConfig(stream, COMMAND, config);
    printOverviewForUpload(stream, uploadResult.progress);
    printAggregatedError(
      stream,
      uploadResult.errorReport,
      config.mapping,
    );
    printInvalidSamples(
      stream,
      uploadResult.errorReport.invalidSamples,
      config.mapping,
    );
    stream.end();
  });
  winston.info(`Report saved to: ${config.reportOutputPath}`);
}

main();
