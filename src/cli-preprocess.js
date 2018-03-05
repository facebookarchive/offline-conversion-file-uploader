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
  printOverviewForPreprocess,
} = reportUtils;
const {
  fetchSamplesAndCheckConfigForRawEventData,
  validateSampleRowsAndStopIfTooManyErrors,
} = configUtils;

const COMMAND = 'preprocess';

// TODO: test preset value
async function main() {
  const config = initConfig.loadConfigOrExit(initConfig.OPTIONS_FOR_PREPROCESS);
  initLogger(config.logging, COMMAND, config.inputFilePath);
  winston.info('Config and logger initialized.');

  await fetchSamplesAndCheckConfigForRawEventData(config);
  const shouldContinue = await validateSampleRowsAndStopIfTooManyErrors(
    SignalsEventDataSchema,
    config,
  );
  if (!shouldContinue) {
    return;
  }

  const {fd, sender} = batchSenders.getPseudoBatchSenderForPreprocessing(
    config.preprocessOutputPath,
    config.mapping,
    config.customTypeInfo,
    config.presetValues,
  );

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
    [], // progress ranges, not used for preprocessing
    {
      type: 'advanced',
      maxNumInvalidSamples: 1000,
    },
    config.batchSize, // num rows per batch
    config.header, // header
    64 * 1024, // chunk size
    64, // max num chunks in buffer
    24, // max num batches in buffer
    1, // max num batches sending in parallel
    1, // concurrrent normalizers, not supported in MDFU.
    sender,
    null, // shouldIgnoreAPIErrorFn
    0, // num retries for API error
    15 * 1000, // retry interval for API error
    0, // num retries for network error
    3 * 1000, // retry interval for network error
    progress => {
      latestProgress = progress;
    },
    () => {}, // network status change callback, not used for preprocessing
    null, // logger, not used for MDFU
  );

  const startTime = Date.now();

  const intervalHandler = setInterval(() => {
    const progress = latestProgress ? latestProgress.estimatedProgress : 0;
    winston.verbose(`Progress: ${(progress * 100).toFixed(2)}%`);
  }, 5000);

  let result;
  try {
    result = await task.run();
    fs.closeSync(fd);
    const uploadTime = ((Date.now() - startTime) / 1000).toFixed(2);
    winston.info('Preprocess finished.');
    winston.info(
      `Preprocessed events saved to: ${config.preprocessOutputPath}`,
    );

    winston.info(`Time elapsed: ${uploadTime} seconds.`);
    const {progress} = result;
    winston.info(`Num rows preprocessed: ${progress.numRowsUploaded}.`);
    if (progress.numRowsFailedToNormalize > 0) {
      winston.warn(
        `${progress.numRowsFailedToNormalize} rows skipped `
        + 'because they are invalid.',
      );
    }
    if (progress.numRowsFailedToUpload > 0) {
      winston.warn(
        `${progress.numRowsFailedToUpload} rows skipped `
        + 'because of unknown error.',
      );
    }
  } catch (error) {
    winston.error(`Upload failed with error: ${error}`);
  }
  clearInterval(intervalHandler);

  const stream = fs.createWriteStream(config.reportOutputPath);
  stream.once('open', () => {
    printConfig(stream, COMMAND, config);
    printOverviewForPreprocess(stream, result.progress);
    printAggregatedError(
      stream,
      result.errorReport,
      config.mapping,
    );
    printInvalidSamples(
      stream,
      result.errorReport.invalidSamples,
      config.mapping,
    );
    stream.end();
  });
  winston.info(`Report saved to: ${config.reportOutputPath}`);
}

main();
