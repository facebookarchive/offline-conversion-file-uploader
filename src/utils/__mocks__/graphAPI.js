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

const Promise = require('promise');

const requests = [];

const graphAPI = jest.fn().mockImplementation((version, path, method, params) => {
  return new Promise((resolve, reject) => {
    requests.push({resolve, reject, argv: {path, method, params}});
  });
});

graphAPI.resolveLastRequest = result => {
  return new Promise(resolve => {
    const p = requests.splice(-1)[0];
    p.resolve(result);
    setTimeout(resolve, 0);
  });
};

graphAPI.rejectLastRequest = error => {
  return new Promise(resolve => {
    const p = requests.splice(-1)[0];
    p.reject(error);
    setTimeout(resolve, 0);
  });
};

graphAPI.getLastRequest = () => {
  return requests[requests.length - 1];
};

graphAPI.hasRequest = () => {
  return requests.length > 0;
};

graphAPI.reset = () => {
  requests.length = 0;
};

module.exports = graphAPI;
