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

const ERROR_CODE_EMPTY_RESPONSE = 1357045;
const DEFAULT_GRAPH_API_VERSION_FOR_E2E = 'v7.0'

let globalAPIVersion = null;
let isE2E = false;

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

function _graphAPI(
  apiVersion: ?string,
  apiPath: string,
  method: 'GET' | 'POST' | 'DELETE',
  data: Object,
): Promise<Object> {
  return new Promise((resolve, reject) => {
    const urlPrefix = apiVersion != null
      ? `https://graph.facebook.com/${apiVersion}`
      : 'https://graph.facebook.com';
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
        let body = '';
        res.setEncoding('utf8');
        res.on('data', d => {
          body += d;
        });
        res.on('end', () => {
          let parsedResponse, error;
          if (res.statusCode === 200) {
            try {
              parsedResponse = JSON.parse(body);
            } catch (ex) {
              reject(new Error('Invalid JSON: ' + body));
              return;
            }
            error = getErrorFromAPIResponse(parsedResponse);
            if (error) {
              reject(_wrapError(error));
            } else {
              resolve(parsedResponse);
            }
          } else {
            const genericError = _wrapError({
              code: 1,
              error_subcode: ERROR_CODE_EMPTY_RESPONSE,
              is_network_error: true,
            });
            try {
              parsedResponse = JSON.parse(body);
              error = getErrorFromAPIResponse(parsedResponse);
              if (error) {
                reject(_wrapError(error));
              } else {
                reject(genericError);
              }
            } catch (ex) {
              reject(genericError);
            }
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

function _getLatestGraphAPIVersion(
  accessToken: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    return _graphAPI(
      null,
      'api_version',
      'GET',
      {access_token: accessToken},
    ).then(result => resolve(result['api_version']))
    .catch(error => reject(error));
  });
}

async function setupGraphAPIVersion(
  accessToken: string,
  versionToUse: ?string = null,
): Promise<void> {
  if (versionToUse != null) {
    globalAPIVersion = versionToUse;
  } else if (isE2E) {
    globalAPIVersion = DEFAULT_GRAPH_API_VERSION_FOR_E2E;
  } else {
    globalAPIVersion = await _getLatestGraphAPIVersion(accessToken);
  }
}

function graphAPIReal(
  apiPath: string,
  method: 'GET' | 'POST' | 'DELETE',
  data: Object = {},
): Promise<Object> {
  return _graphAPI(
    globalAPIVersion,
    apiPath,
    method,
    data,
  );
}

// Keyed by the method, apiPath and data.
let mockedCalls: Object = {};
// Keyed by only method and apiPath, in case data is too complicated.
let mockedCallsSimple: Object = {};
let mockedCallsDumpPath;
const MOCK_API_LATENCY_MIN = 5;
const MOCK_API_LATENCY_MAX = 100;

function graphAPIForE2ETest(
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
  isE2E = true;
  apiImpl = graphAPIForE2ETest;
}

let apiImpl = graphAPIReal;

function graphAPI(
  apiPath: string,
  method: 'GET' | 'POST' | 'DELETE',
  data: ?Object,
): Promise<Object> {
  return apiImpl(apiPath, method, data);
}

module.exports = {
  graphAPI,
  setupE2E,
  setupGraphAPIVersion,
};
