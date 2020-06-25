/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

const DEFAULT_GRAPH_API_VERSION_FOR_E2E = 'v7.0';

jest
  .mock('winston', () => ({}))
  .mock('https', () => {
    const request = jest.fn();
    const reqOn = jest.fn();
    const reqWrite = jest.fn();
    const reqEnd = jest.fn();
    request.mockReturnValue({
      on: reqOn,
      write: reqWrite,
      end: reqEnd,
    });
    return {
      request,
      reqOn,
      reqWrite,
      reqEnd,
    };
  });

afterEach(() => {
  const https = require('https');
  https.request.mockClear();
  https.reqOn.mockClear();
  https.reqWrite.mockClear();
  https.reqEnd.mockClear();
});

const graphAPIUtils = require('../graphAPIUtils');

const {graphAPI, setupGraphAPIVersion} = graphAPIUtils;

beforeEach(() => {
  setupGraphAPIVersion('<ACCESS_TOKEN>', DEFAULT_GRAPH_API_VERSION_FOR_E2E);
});

// Wrap the graphAPI async function so that it prints out stack trace on error.
async function callGraphAPI(
  apiPath: string,
  method: 'GET' | 'POST' | 'DELETE',
  data: Object,
) {
  try {
    return await graphAPI(apiPath, method, data);
  } catch (ex) {
    // Uncomment the following line to debug.
    // console.error(ex);
    throw ex;
  }
}

test('Setup Graph API version automatically to latest', async () => {
  const https = require('https');
  const setupVersion = setupGraphAPIVersion('abc');
  const requestCalls = https.request.mock.calls;
  expect(https.reqOn).toHaveBeenCalledTimes(1);
  expect(https.reqWrite).not.toHaveBeenCalled();
  expect(https.reqEnd).toHaveBeenCalledTimes(1);
  expect(requestCalls[0][0]).toEqual({
    hostname: 'graph.facebook.com',
    port: 443,
    method: 'GET',
    path: 'https://graph.facebook.com/api_version?access_token=abc',
  });
  const res = {
    setEncoding: jest.fn(),
    on: jest.fn(),
    statusCode: 200,
  };
  requestCalls[0][1](res);
  expect(res.on).toHaveBeenCalledTimes(2);
  expect(res.on.mock.calls[0][0]).toBe('data');
  expect(res.on.mock.calls[1][0]).toBe('end');

  res.on.mock.calls[0][1](JSON.stringify({api_version: DEFAULT_GRAPH_API_VERSION_FOR_E2E}));
  res.on.mock.calls[1][1]();
  await setupVersion;

  // Test calling Graph API uses new version
  callGraphAPI('123456', 'GET', {access_token: 'abc'});
  expect(https.reqOn).toHaveBeenCalledTimes(2);
  expect(https.reqWrite).not.toHaveBeenCalled();
  expect(https.reqEnd).toHaveBeenCalledTimes(2);
  expect(requestCalls[1][0]).toEqual({
    hostname: 'graph.facebook.com',
    port: 443,
    method: 'GET',
    path: 'https://graph.facebook.com/' + DEFAULT_GRAPH_API_VERSION_FOR_E2E + '/123456?access_token=abc',
  });
});

test('GET without params and with valid response', async () => {
  const api = callGraphAPI('123456', 'GET', {access_token: 'abc'});
  const https = require('https');
  const requestCalls = https.request.mock.calls;
  expect(https.reqOn).toHaveBeenCalledTimes(1);
  expect(https.reqWrite).not.toHaveBeenCalled();
  expect(https.reqEnd).toHaveBeenCalledTimes(1);
  expect(requestCalls[0][0]).toEqual({
    hostname: 'graph.facebook.com',
    port: 443,
    method: 'GET',
    path: 'https://graph.facebook.com/' + DEFAULT_GRAPH_API_VERSION_FOR_E2E + '/123456?access_token=abc',
  });
  const res = {
    setEncoding: jest.fn(),
    on: jest.fn(),
    statusCode: 200,
  };
  requestCalls[0][1](res);
  expect(res.on).toHaveBeenCalledTimes(2);
  expect(res.on.mock.calls[0][0]).toBe('data');
  expect(res.on.mock.calls[1][0]).toBe('end');
  res.on.mock.calls[0][1](JSON.stringify({success: true}));
  res.on.mock.calls[1][1]();
  const result = await api;
  expect(result).toEqual({success: true});
});

test('GET with params, make sure they are encoded', async () => {
  callGraphAPI(
    '123456',
    'GET',
    {access_token: 'abc', x: 1, y: 2, '\u4F60': '\u597D'},
  );
  const https = require('https');
  const requestCalls = https.request.mock.calls;
  expect(https.reqOn).toHaveBeenCalledTimes(1);
  expect(https.reqWrite).not.toHaveBeenCalled();
  expect(https.reqEnd).toHaveBeenCalledTimes(1);
  expect(requestCalls[0][0]).toEqual({
    hostname: 'graph.facebook.com',
    port: 443,
    method: 'GET',
    path: 'https://graph.facebook.com/' + DEFAULT_GRAPH_API_VERSION_FOR_E2E + '/123456?access_token=abc&x=1&y=2&%E4%BD%A0=%E5%A5%BD',
  });
});

test('GET with invalid JSON in response', async () => {
  const api = callGraphAPI('123456', 'GET', {access_token: 'abc'});
  const https = require('https');
  const requestCalls = https.request.mock.calls;
  const res = {
    setEncoding: jest.fn(),
    on: jest.fn(),
    statusCode: 200,
  };
  requestCalls[0][1](res);
  res.on.mock.calls[0][1]('response not in JSON');
  res.on.mock.calls[1][1]();
  await expect(api).rejects.toThrow('Invalid JSON: response not in JSON');
});

test('GET with null response', async () => {
  const api = callGraphAPI('123456', 'GET', {access_token: 'abc'});
  const https = require('https');
  const requestCalls = https.request.mock.calls;
  const res = {
    setEncoding: jest.fn(),
    on: jest.fn(),
    statusCode: 200,
  };
  requestCalls[0][1](res);
  res.on.mock.calls[0][1]('null');
  res.on.mock.calls[1][1]();
  expect.hasAssertions();
  try {
    await api;
  } catch (error) {
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Unknown error (empty response)');
    expect(error.code).toBe(0);
    expect(error.type).toBe('http');
  }
});

test('GET with error field', async () => {
  const api = callGraphAPI('123456', 'GET', {access_token: 'abc'});
  const https = require('https');
  const requestCalls = https.request.mock.calls;
  const res = {
    setEncoding: jest.fn(),
    on: jest.fn(),
    statusCode: 200,
  };
  requestCalls[0][1](res);
  res.on.mock.calls[0][1](JSON.stringify({error: {x: 1, y: 2}}));
  res.on.mock.calls[1][1]();
  expect.hasAssertions();
  try {
    await api;
  } catch (error) {
    expect(error).toBeInstanceOf(Error);
    expect(error.x).toBe(1);
    expect(error.y).toBe(2);
  }
});

test('GET with error_code and error_msg field', async () => {
  const api = callGraphAPI('123456', 'GET', {access_token: 'abc'});
  const https = require('https');
  const requestCalls = https.request.mock.calls;
  const res = {
    setEncoding: jest.fn(),
    on: jest.fn(),
    statusCode: 200,
  };
  requestCalls[0][1](res);
  res.on.mock.calls[0][1](JSON.stringify({
    error_code: 123,
    error_msg: 'hello',
    error_type: 'abc',
    error_subcode: 456,
  }));
  res.on.mock.calls[1][1]();
  expect.hasAssertions();
  try {
    await api;
  } catch (error) {
    expect(error).toBeInstanceOf(Error);
    expect(error.code).toBe(123);
    expect(error.message).toBe('hello');
    expect(error.type).toBe('abc');
    expect(error.error_subcode).toBe(456);
  }
});

test('GET with non 200 error', async () => {
  const api = callGraphAPI('123456', 'GET', {access_token: 'abc'});
  const https = require('https');
  const requestCalls = https.request.mock.calls;
  const res = {
    setEncoding: jest.fn(),
    on: jest.fn(),
    statusCode: 0,
  };
  requestCalls[0][1](res);
  res.on.mock.calls[0][1]();
  res.on.mock.calls[1][1]();
  expect.hasAssertions();
  try {
    await api;
  } catch (error) {
    expect(error).toBeInstanceOf(Error);
    expect(error.code).toBe(1);
    expect(error.is_network_error).toBe(true);
    expect(error.error_subcode).toBe(1357045);
  }
});

test('GET with error', async () => {
  const api = callGraphAPI('123456', 'GET', {access_token: 'abc'});
  const https = require('https');
  https.reqOn.mock.calls[0][1](new Error('random issue'));
  await expect(api).rejects.toThrow('random issue');
});

test('POST with params', async () => {
  const params = {access_token: 'abc', x: 1, y: 2, '\u4F60': '\u597D'};
  callGraphAPI('123456', 'POST', params);
  const https = require('https');
  const requestCalls = https.request.mock.calls;
  expect(https.reqOn).toHaveBeenCalledTimes(1);
  expect(https.reqWrite).toHaveBeenCalledTimes(1);
  expect(https.reqWrite.mock.calls[0][0]).toEqual(JSON.stringify(params));
  expect(https.reqEnd).toHaveBeenCalledTimes(1);
  expect(requestCalls[0][0]).toEqual({
    hostname: 'graph.facebook.com',
    port: 443,
    method: 'POST',
    path: 'https://graph.facebook.com/' + DEFAULT_GRAPH_API_VERSION_FOR_E2E + '/123456',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(JSON.stringify(params)),
    },
  });
});
