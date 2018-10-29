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
const https = require('https');
const path = require('path');
const Promise = require('promise');
const stringify = require('json-stable-stringify');
const winston = require('winston');

const MARKETING_API_VERSION = 'v3.0';
const ERROR_CODE_EMPTY_RESPONSE = 1357045;

function _wrapError(errorData: Object): Object {
  const error = new Error(errorData.message);
  Object.assign(error, errorData);
  return error;
}

function getErrorFromAPIResponse(response: any): ?Object {
  if (!response) {
    return {
      message: 'Unknown error (empty response)',
      code: 0,
      type: 'http',
    };
  }
  if (response.error) {
    return response.error;
  }
  if (response.error_code && response.error_msg) {
    return {
      message: response.error_msg,
      code: response.error_code,
      type: response.error_type,
      error_subcode: response.error_subcode,
    };
  }
  return undefined;
}

function graphAPIReal(
  apiVersion: ?string,
  apiPath: string,
  method: 'GET' | 'POST' | 'DELETE',
  data: ?Object,
): Promise<Object> {
  return new Promise((resolve, reject) => {
    console.log(apiVersion);
    const apiVer = apiVersion ? apiVersion : MARKETING_API_VERSION;
    const urlPrefix = `https://graph.facebook.com/${apiVer}`;
    const baseParams = {
      hostname: 'graph.facebook.com',
      port: 443,
      method,
    };
    let params;
    let jsonData;
    if (method === 'GET') {
      const encodedParams = [];
      if (data) {
        for (let key in data) {
          encodedParams.push(
            `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`,
          );
        }
      }
      const path = encodedParams.length > 0
        ? `${urlPrefix}/${apiPath}?${encodedParams.join('&')}`
        : `${urlPrefix}/${apiPath}`;
      params = {
        ...baseParams,
        path,
      };
    } else if (method === 'POST' || method === 'DELETE') {
      let headers;
      if (data != null) {
        jsonData = stringify(data);
        headers = {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(jsonData),
        };
      }
      params = {
        ...baseParams,
        path: `${urlPrefix}/${apiPath}`,
        headers,
      };
    } else {
      winston.error(`Invalid API method: ${method}`);
      process.exit(1);
    }

    const req = https.request(
      params || {},
      res => {
        res.setEncoding('utf8');
        res.on('data', d => {
          if (res.statusCode === 200) {
            let parsedResponse;
            try {
              parsedResponse = JSON.parse(d);
            } catch (ex) {
              reject(new Error('Invalid JSON: ' + d));
              return;
            }
            const error = getErrorFromAPIResponse(parsedResponse);
            if (error) {
              reject(_wrapError(error));
            } else {
              resolve(parsedResponse);
            }
          } else {
            reject(_wrapError({
              code: 1,
              error_subcode: ERROR_CODE_EMPTY_RESPONSE,
              is_network_error: true,
            }));
          }
        });
      },
    );
    req.on('error', error => {
      reject(error);
    });
    if (jsonData != null) {
      req.write(jsonData);
    }
    req.end();
  });
}

// Keyed by the method, apiPath and data.
let mockedCalls: Object = {};
// Keyed by only method and apiPath, in case data is too complicated.
let mockedCallsSimple: Object = {};
let mockedCallsDumpPath;
const MOCK_API_LATENCY_MIN = 5;
const MOCK_API_LATENCY_MAX = 100;

function graphAPIForE2ETest(
  apiVersion: ?string,
  apiPath: string,
  method: 'GET' | 'POST' | 'DELETE',
  data: ?Object,
): Promise<Object> {
  const key = stringify({apiPath, method, data});
  return new Promise(resolve => {
    const result = mockedCalls[key]
      || mockedCallsSimple[`${method}:${apiPath}`];
    const latency = MOCK_API_LATENCY_MIN
      + Math.random() * (MOCK_API_LATENCY_MAX - MOCK_API_LATENCY_MIN);
    setTimeout(() => {
      if (mockedCallsDumpPath == null) {
        winston.error('No API call expected for this E2E test.');
        process.exit(1);
      }
      fs.appendFile(
        mockedCallsDumpPath,
        key + '\n',
        {
          encoding: 'utf8',
        },
        () => resolve(result),
      );
    }, latency);
  });
}

function setupE2E(config: {
  mockedCalls?: ?Array<{
    params: {
      apiPath: string,
      method: 'GET' | 'POST' | 'DELETE',
      data: ?Object,
    },
    result: any,
  }>,
  mockedCallsSimple?: ?Array<{
    params: {
      apiPath: string,
      method: 'GET' | 'POST' | 'DELETE',
    },
    result: any,
  }>,
  mockedCallsDumpPath?: ?string,
}): void {
  (config.mockedCalls || []).forEach(call => {
    mockedCalls[stringify(call.params)] = call.result;
  });
  (config.mockedCallsSimple || []).forEach(call => {
    mockedCallsSimple[`${call.params.method}:${call.params.apiPath}`] =
      call.result;
  });
  if (config.mockedCallsDumpPath != null) {
    mockedCallsDumpPath = path.resolve(config.mockedCallsDumpPath);
    // eslint-disable-next-line no-useless-concat
    fs.writeFileSync(mockedCallsDumpPath, '@' + 'generated\n');
  }
  apiImpl = graphAPIForE2ETest;
}

let apiImpl = graphAPIReal;

function graphAPI(
  apiVersion: ?string,
  apiPath: string,
  method: 'GET' | 'POST' | 'DELETE',
  data: ?Object,
): Promise<Object> {
  return apiImpl(apiVersion, apiPath, method, data);
}

graphAPI.setupE2E = setupE2E;

module.exports = graphAPI;
