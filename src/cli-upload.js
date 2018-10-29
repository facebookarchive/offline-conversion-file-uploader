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
const initConfig = require('./utils/initConfig');
const initLogger = require('./utils/initLogger');
const initUpload = require('./utils/initUpload');
const reportUtils = require('./utils/reportUtils');
const SignalsUploaderLibrary = require('./uploader/SignalsUploaderLibrary');
const winston = require('winston');

const {
  SignalsEventDataSchema,
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
  fetchSamplesAndCheckConfigForRawEventData,
  validateSampleRowsAndStopIfTooManyErrors,
} = configUtils;

const COMMAND = 'upload';


async function main() {
  const config = initConfig.loadConfigOrExit(initConfig.OPTIONS_FOR_UPLOAD);
  initLogger(
    config.logging,
    COMMAND,
    config.inputFilePath,
    config.disableLogging,
  );
  winston.info('Config and logger initialized.');

  await fetchSamplesAndCheckConfigForRawEventData(config);
  const shouldContinue = await validateSampleRowsAndStopIfTooManyErrors(
    SignalsEventDataSchema,
    config,
  );
  if (!shouldContinue) {
    return;
  }

  await checkAccessTokenAndEnt(
    config.apiVersion,
    config.accessToken,
    config.dataSetID,
    'dataSetID',
  );

  const {
    uploadID,
    progressRanges
  } = await initUpload(config);

  let latestProgress = null;

  const task = new SignalsUploaderUploadTask(
    config.inputFilePath,
    config.delimiter,
    {
      schema: SignalsEventDataSchema,
      mapping: config.mapping,
      infoForNormalization: config.format,
      customTypeInfo: config.customTypeInfo,
    },
    config.presetValues,
    progressRanges || [],
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
    batchSenders.getOfflineEventsBatchSender(
      config.accessToken,
      config.dataSetID,
      uploadID,
      config.namespaceID,
      progressRanges != null, // enableProgressTracking
      config.apiVersion,
    ),
    batchSenders.shouldIgnoreAPIErrorFn,
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
    const uploadTime = ((Date.now() - startTime) / 1000).toFixed(2);
    winston.info('Upload finished.');
    winston.info(`Time elapsed: ${uploadTime} seconds.`);
    const {progress} = uploadResult;
    winston.info(`Num rows uploaded: ${progress.numRowsUploaded}.`);
    if (progress.numRowsAlreadyUploaded > 0) {
      winston.warn(
        `${progress.numRowsAlreadyUploaded} rows skipped `
        + 'because of resuming.',
      );
    }
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
