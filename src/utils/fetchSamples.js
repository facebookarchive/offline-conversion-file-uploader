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

const SignalsUploaderLibrary = require('../uploader/SignalsUploaderLibrary');
const Promise = require('promise');

const {SignalsUploaderSampleFetchTask} = SignalsUploaderLibrary;

// A thin wrapper over SignalsUploaderSampleFetchTask with some preset
// params to make callers easier.
function fetchSamples(
  path: string,
  delimiter: string,
  numSampleRows: number,
): Promise<Array<Array<?string>>> {
  return new Promise((resolve, reject) => {
    const task = SignalsUploaderSampleFetchTask(
      path,
      delimiter,
      numSampleRows,
      4096, // chunk size
      16, // max num chunks in buffer
      null, // logger is not used for MDFU
    );
    task.run().done(
      result => {
        resolve(result.samples);
      },
      error => {
        reject(error);
      },
    );
  });
}

module.exports = fetchSamples;
