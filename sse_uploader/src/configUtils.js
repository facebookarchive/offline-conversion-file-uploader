// @flow
const fs = require('fs');
const program = require('commander');

export type Config = {
  access_token: string,
  pixel_id: string,
  batch_size: number,
  test_id: ?string,
}

const REQUIRED_FIELDS = ['access_token', 'pixel_id'];

const DEFAULT_BATCH_SIZE = 100;

function loadConfigOrExit(path: string): Config {
  let rawConfig = fs.readFileSync(path, 'utf-8');
  const fileConfig = JSON.parse(rawConfig);
  const config = {};

  for (let prop of REQUIRED_FIELDS) {
    if (!fileConfig.hasOwnProperty(prop)) {
      throw new Error(`Required field (${prop}) missing in configuration file.`);
    }
    config[prop] = fileConfig[prop];
  }

  if (program.testMode) {
    if (!fileConfig.test_id) {
      throw new Error(`Missing test_id in configuration file (required to run the script in test mode).`);
    }
    config.test_id = fileConfig.test_id;
  }

  config.batch_size = fileConfig.batch_size ? fileConfig.batch_size : DEFAULT_BATCH_SIZE;

  return config;
}

module.exports = {
  loadConfigOrExit
};
