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

const fs = require('fs');
const graphAPI = require('./graphAPI');
const path = require('path');
const winston = require('winston');

function getFileSignatureLegacy(filepath: string): string {
  const filestat = fs.statSync(filepath);
  const timestamp = Date.parse(filestat.mtime.toUTCString());
  return `${path.basename(filepath)}@${timestamp}`;
}

function getFileSignatureUsingSize(filepath: string): string {
  var filestat = fs.statSync(filepath);
  return `${path.basename(filepath)} (${filestat.size}bytes)`;
}

function getProgressRanges(progress: Array<{
  start_inclusive: number,
  end_exclusive: number,
}>): Array<{
  start: number,
  end: number,
}> {
  return progress.map(p => ({start: p.start_inclusive, end: p.end_exclusive}));
}

async function initUpload(config: {
  uploadID?: string,
  uploadTag?: string,
  uploadTagPrefix?: string,
  skipRowsAlreadyUploaded?: boolean,
  inputFilePath: string,
  accessToken: string,
  dataSetID: string,
  apiVersion?: string,
}): Promise<{
  uploadID: string,
  uploadTag: string,
  progressRanges: ?Array<{start: number, end: number}>,
}> {
  let uploadID, progressRanges, uploadTag;
  try {
    if (config.uploadID) {
      const upload = await graphAPI(
        config.apiVersion,
        config.uploadID,
        'GET',
        {
          access_token: config.accessToken,
          fields: ['progress', 'upload_tag'],
        },
      );
      uploadID = config.uploadID;
      uploadTag = upload.upload_tag;
      progressRanges = config.skipRowsAlreadyUploaded
        ? getProgressRanges((upload.progress && upload.progress.data) || [])
        : null;
      winston.info('Found existing upload ID.');
    } else {
      if (config.uploadTag) {
        uploadTag = config.uploadTag;
      } else if (config.uploadTagPrefix != null) {
        winston.info(
          `Upload tag generated from prefix: ${config.uploadTagPrefix}`,
        );
        uploadTag = (config.uploadTagPrefix || '')
          + ` (${getFileSignatureLegacy(config.inputFilePath)})`;
      } else {
        winston.info('Upload tag generated from file name and size.');
        uploadTag = getFileSignatureUsingSize(config.inputFilePath);
      }
      const uploads = await graphAPI(
        config.apiVersion,
        `${config.dataSetID}/uploads`,
        'GET',
        {
          access_token: config.accessToken,
          upload_tag: uploadTag,
          fields: ['id', 'upload_tag', 'progress'],
        },
      );
      if (uploads && uploads.data && uploads.data.length > 0) {
        const upload = uploads.data[0];
        uploadID = upload.id;
        progressRanges = config.skipRowsAlreadyUploaded
          ? getProgressRanges((upload.progress && upload.progress.data) || [])
          : null;
        winston.info('Found existing upload tag.');
      } else {
        const createUploadResult = await graphAPI(
          config.apiVersion,
          `${config.dataSetID}/uploads`,
          'POST',
          {
            access_token: config.accessToken,
            upload_tag: uploadTag,
          },
        );
        uploadID = createUploadResult.id;
        progressRanges = config.skipRowsAlreadyUploaded
          ? []
          : null;
        winston.info('Created new upload tag.');
      }
    }
    if (uploadID == null || uploadTag == null) {
      throw new Error('Upload not initialized properly.');
    }
    winston.info(`Upload ID: ${uploadID}`);
    winston.info(`Upload Tag: ${uploadTag}`);
    if (progressRanges && progressRanges.length > 0) {
      const progressRangesStr = progressRanges
        .map(range => `[${range.start}, ${range.end})`)
        .join(' ');
      winston.info(
        'Resuming, rows fall into the following byte ranges will not be '
        + `uploaded: ${progressRangesStr}`
      );
    }
    return {
      uploadID,
      uploadTag,
      progressRanges,
    };
  } catch (error) {
    winston.error(`Failed to initialize upload tag: ${error}`);
    console.warn(error);
    process.exit(1);

    // To make flow happy.
    throw error;
  }
}

module.exports = initUpload;
