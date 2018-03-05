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

var commander = require('commander');

commander
  .version('2.0.0')
  .command('upload', 'Hash and upload offline event file.')
  .command(
    'validate',
    'Run a test upload and validate data using a sample of the input.',
  )
  .command('preprocess', 'Preprocess the offline event file and export it.')
  .command('upload-preprocessed', 'Upload the preprocessed offline event file.')
  .parse(process.argv);
