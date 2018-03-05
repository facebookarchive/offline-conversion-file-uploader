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

const winston = require('winston');
const path = require('path');

function timestamp(): string {
  return new Date().toISOString();
}

type Options = {
  timestamp: () => string,
  level: string,
  message: string,
  meta: Object,
};

function plainFormatter(options: Options): string {
  return options.timestamp() + ' ' + options.level.toUpperCase() + ' ' +
    (options.message ? options.message : ' ') +
    (options.meta && Object.keys(options.meta).length ? '\n\t' +
      JSON.stringify(options.meta) : '' );
}

function awsFormatter(options: Options): string {
  const returnMsg = {
    timestamp: options.timestamp(),
    level: options.level.toUpperCase(),
    msg: (options.message ? options.message : ''),
    meta: (options.meta && Object.keys(options.meta).length ? '\n\t' +
      JSON.stringify(options.meta) : ''),
  };
  return JSON.stringify(returnMsg);
}

function initLogger(
  level: string,
  prefix: string,
  filePath: string,
) {
  const date = new Date().toISOString();
  const fileName = path.basename(filePath);
  winston.configure({
    level,
    transports: [
      new winston.transports.Console({
        timestamp,
        formatter: plainFormatter,
      }),
      new winston.transports.File({
        name: 'log-in-plain-text',
        filename: `${prefix}-${fileName}-${date}-txt.log`,
        json: false,
        timestamp,
        formatter: plainFormatter,
      }),
      new winston.transports.File({
        name: 'log-in-aws-format',
        filename: `${prefix}-${fileName}-${date}-aws.log`,
        json: false,
        timestamp,
        formatter: awsFormatter,
      }),
    ],
  });
}

module.exports = initLogger;
