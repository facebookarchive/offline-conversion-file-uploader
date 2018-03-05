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
  .mock('fs', () => ({
    statSync: jest.fn().mockReturnValue({
      mtime: new Date('2018-01-01'),
      size: 12345678,
    })
  }))
  .mock('path', () => ({
    basename: jest.fn().mockImplementation(path => {
      const parts = path.split('/');
      return parts[parts.length - 1];
    }),
  }))
  .mock('winston', () => ({info: jest.fn(), error: jest.fn()}))
  .mock('../graphAPI');

const initUpload = require('../initUpload');

beforeEach(() => {
  require('../graphAPI').reset();
});

test('get upload by ID', async () => {
  let resultPromise, result;
  resultPromise = initUpload({
    uploadID: '666666',
    inputFilePath: 'path/to/input.csv',
    accessToken: '<ACCESS_TOKEN>',
    dataSetID: '111111',
  });
  const graphAPI = require('../graphAPI');
  expect(graphAPI.hasRequest()).toBe(true);
  expect(graphAPI.getLastRequest().argv).toEqual({
    path: '666666',
    method: 'GET',
    params: {
      access_token: '<ACCESS_TOKEN>',
      fields: ['progress', 'upload_tag'],
    },
  });
  await graphAPI.resolveLastRequest({
    upload_tag: 'mdfu-upload',
    progress: {
      data: [{start_inclusive: 0, end_exclusive: 10}],
    },
  });
  result = await resultPromise;
  expect(result).toEqual({
    uploadID: '666666',
    uploadTag: 'mdfu-upload',
    progressRanges: null,
  });
  expect(graphAPI.hasRequest()).toBe(false);

  // skipRowsAlreadyUploaded
  resultPromise = initUpload({
    uploadID: '666666',
    inputFilePath: 'path/to/input.csv',
    accessToken: '<ACCESS_TOKEN>',
    dataSetID: '111111',
    skipRowsAlreadyUploaded: true,
  });
  expect(graphAPI.hasRequest()).toBe(true);
  await graphAPI.resolveLastRequest({
    upload_tag: 'mdfu-upload',
    progress: {
      data: [{start_inclusive: 0, end_exclusive: 10}],
    },
  });
  result = await resultPromise;
  expect(result).toEqual({
    uploadID: '666666',
    uploadTag: 'mdfu-upload',
    progressRanges: [{start: 0, end: 10}],
  });
  expect(graphAPI.hasRequest()).toBe(false);
});

test('get upload by upload Tag', async () => {
  let resultPromise, result;
  resultPromise = initUpload({
    uploadTag: 'mdfu-upload',
    inputFilePath: 'path/to/input.csv',
    accessToken: '<ACCESS_TOKEN>',
    dataSetID: '111111',
  });
  const graphAPI = require('../graphAPI');
  expect(graphAPI.hasRequest()).toBe(true);
  expect(graphAPI.getLastRequest().argv).toEqual({
    path: '111111/uploads',
    method: 'GET',
    params: {
      access_token: '<ACCESS_TOKEN>',
      upload_tag: 'mdfu-upload',
      fields: ['id', 'upload_tag', 'progress'],
    },
  });
  await graphAPI.resolveLastRequest({data: []});
  expect(graphAPI.hasRequest()).toBe(true);
  expect(graphAPI.getLastRequest().argv).toEqual({
    path: '111111/uploads',
    method: 'POST',
    params: {
      access_token: '<ACCESS_TOKEN>',
      upload_tag: 'mdfu-upload',
    },
  });
  await graphAPI.resolveLastRequest({id: '666666'});
  result = await resultPromise;
  expect(result).toEqual({
    uploadID: '666666',
    uploadTag: 'mdfu-upload',
    progressRanges: null,
  });
  expect(graphAPI.hasRequest()).toBe(false);

  // Test the case that upload already exist.
  resultPromise = initUpload({
    uploadTag: 'mdfu-upload',
    inputFilePath: 'path/to/input.csv',
    accessToken: '<ACCESS_TOKEN>',
    dataSetID: '111111',
    skipRowsAlreadyUploaded: true,
  });
  expect(graphAPI.hasRequest()).toBe(true);
  await graphAPI.resolveLastRequest({data: [
    {
      id: '777777',
      upload_tag: 'mdfu-upload',
      progress: {
        data: [
          {start_inclusive: 10, end_exclusive: 20},
        ],
      },
    },
  ]});
  result = await resultPromise;
  expect(result).toEqual({
    uploadID: '777777',
    uploadTag: 'mdfu-upload',
    progressRanges: [{start: 10, end: 20}],
  });
  expect(graphAPI.hasRequest()).toBe(false);
});

test('get upload by upload Tag Prefix', async () => {
  const resultPromise = initUpload({
    uploadTagPrefix: 'mdfu-upload',
    inputFilePath: 'path/to/input.csv',
    accessToken: '<ACCESS_TOKEN>',
    dataSetID: '111111',
  });
  const graphAPI = require('../graphAPI');
  expect(graphAPI.hasRequest()).toBe(true);
  expect(graphAPI.getLastRequest().argv).toEqual({
    path: '111111/uploads',
    method: 'GET',
    params: {
      access_token: '<ACCESS_TOKEN>',
      upload_tag: 'mdfu-upload (input.csv@1514764800000)',
      fields: ['id', 'upload_tag', 'progress'],
    },
  });
  await graphAPI.resolveLastRequest({data: [{
    id: '666666',
    upload_tag: 'mdfu-upload (input.csv@1514764800000)',
    progress: {data: []},
  }]});
  const result = await resultPromise;
  expect(result).toEqual({
    uploadID: '666666',
    uploadTag: 'mdfu-upload (input.csv@1514764800000)',
    progressRanges: null,
  });
  expect(graphAPI.hasRequest()).toBe(false);
});

test('get upload by default', async () => {
  const resultPromise = initUpload({
    inputFilePath: 'path/to/input.csv',
    accessToken: '<ACCESS_TOKEN>',
    dataSetID: '111111',
  });
  const graphAPI = require('../graphAPI');
  expect(graphAPI.hasRequest()).toBe(true);
  expect(graphAPI.getLastRequest().argv).toEqual({
    path: '111111/uploads',
    method: 'GET',
    params: {
      access_token: '<ACCESS_TOKEN>',
      upload_tag: 'input.csv (12345678bytes)',
      fields: ['id', 'upload_tag', 'progress'],
    },
  });
  await graphAPI.resolveLastRequest({data: [{
    id: '666666',
    upload_tag: 'input.csv (12345678bytes)',
    progress: {data: [{start_inclusive: 10, end_exclusive: 50}]},
  }]});
  const result = await resultPromise;
  expect(result).toEqual({
    uploadID: '666666',
    uploadTag: 'input.csv (12345678bytes)',
    progressRanges: null,
  });
  expect(graphAPI.hasRequest()).toBe(false);
});

test('upload already exists but skipRowsAlreadyUploaded not set', async () => {
  const resultPromise = initUpload({
    inputFilePath: 'path/to/input.csv',
    accessToken: '<ACCESS_TOKEN>',
    dataSetID: '111111',
    skipRowsAlreadyUploaded: true,
  });
  const graphAPI = require('../graphAPI');
  expect(graphAPI.hasRequest()).toBe(true);
  expect(graphAPI.getLastRequest().argv).toEqual({
    path: '111111/uploads',
    method: 'GET',
    params: {
      access_token: '<ACCESS_TOKEN>',
      upload_tag: 'input.csv (12345678bytes)',
      fields: ['id', 'upload_tag', 'progress'],
    },
  });
  await graphAPI.resolveLastRequest({data: [{
    id: '666666',
    upload_tag: 'input.csv (12345678bytes)',
    progress: {data: [
      {start_inclusive: 10, end_exclusive: 50},
      {start_inclusive: 100, end_exclusive: 150},
    ]},
  }]});
  const result = await resultPromise;
  expect(result).toEqual({
    uploadID: '666666',
    uploadTag: 'input.csv (12345678bytes)',
    progressRanges: [{start: 10, end: 50}, {start: 100, end: 150}],
  });
  expect(graphAPI.hasRequest()).toBe(false);
});
