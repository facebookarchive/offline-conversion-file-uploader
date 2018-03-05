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

const graphAPI = require('../graphAPI');

// Wrap the graphAPI async function so that it prints out stack trace on error.
async function callGraphAPI(apiPath, method, data) {
  try {
    return await graphAPI(apiPath, method, data);
  } catch (ex) {
    // Uncomment the following line to debug.
    // console.error(ex);
    throw ex;
  }
}

test('GET without params and with valid response', async () => {
  const api = callGraphAPI('123456', 'GET');
  const https = require('https');
  const requestCalls = https.request.mock.calls;
  expect(https.reqOn).toHaveBeenCalledTimes(1);
  expect(https.reqWrite).not.toHaveBeenCalled();
  expect(https.reqEnd).toHaveBeenCalledTimes(1);
  expect(requestCalls[0][0]).toEqual({
    hostname: 'graph.facebook.com',
    port: 443,
    method: 'GET',
    path: 'https://graph.facebook.com/v2.10/123456',
  });
  const res = {
    setEncoding: jest.fn(),
    on: jest.fn(),
    statusCode: 200,
  };
  requestCalls[0][1](res);
  expect(res.on).toHaveBeenCalledTimes(1);
  expect(res.on.mock.calls[0][0]).toBe('data');
  res.on.mock.calls[0][1](JSON.stringify({success: true}));
  const result = await api;
  expect(result).toEqual({success: true});
});

test('GET with params, make sure they are encoded', async () => {
  callGraphAPI('123456', 'GET', {x: 1, y: 2, '\u4F60': '\u597D'});
  const https = require('https');
  const requestCalls = https.request.mock.calls;
  expect(https.reqOn).toHaveBeenCalledTimes(1);
  expect(https.reqWrite).not.toHaveBeenCalled();
  expect(https.reqEnd).toHaveBeenCalledTimes(1);
  expect(requestCalls[0][0]).toEqual({
    hostname: 'graph.facebook.com',
    port: 443,
    method: 'GET',
    path: 'https://graph.facebook.com/v2.10/123456?x=1&y=2&%E4%BD%A0=%E5%A5%BD',
  });
});

test('GET with invalid JSON in response', async () => {
  const api = callGraphAPI('123456', 'GET');
  const https = require('https');
  const requestCalls = https.request.mock.calls;
  const res = {
    setEncoding: jest.fn(),
    on: jest.fn(),
    statusCode: 200,
  };
  requestCalls[0][1](res);
  res.on.mock.calls[0][1]('response not in JSON');
  await expect(api).rejects.toThrow('Invalid JSON: response not in JSON');
});

test('GET with null response', async () => {
  const api = callGraphAPI('123456', 'GET');
  const https = require('https');
  const requestCalls = https.request.mock.calls;
  const res = {
    setEncoding: jest.fn(),
    on: jest.fn(),
    statusCode: 200,
  };
  requestCalls[0][1](res);
  res.on.mock.calls[0][1]('null');
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
  const api = callGraphAPI('123456', 'GET');
  const https = require('https');
  const requestCalls = https.request.mock.calls;
  const res = {
    setEncoding: jest.fn(),
    on: jest.fn(),
    statusCode: 200,
  };
  requestCalls[0][1](res);
  res.on.mock.calls[0][1](JSON.stringify({error: {x: 1, y: 2}}));
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
  const api = callGraphAPI('123456', 'GET');
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
  const api = callGraphAPI('123456', 'GET');
  const https = require('https');
  const requestCalls = https.request.mock.calls;
  const res = {
    setEncoding: jest.fn(),
    on: jest.fn(),
    statusCode: 0,
  };
  requestCalls[0][1](res);
  res.on.mock.calls[0][1]();
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
  const api = callGraphAPI('123456', 'GET');
  const https = require('https');
  https.reqOn.mock.calls[0][1](new Error('random issue'));
  await expect(api).rejects.toThrow('random issue');
});

test('POST with params', async () => {
  const params = {x: 1, y: 2, '\u4F60': '\u597D'};
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
    path: 'https://graph.facebook.com/v2.10/123456',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(JSON.stringify(params)),
    },
  });
});
