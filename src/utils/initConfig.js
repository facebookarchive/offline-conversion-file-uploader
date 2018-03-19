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

const commander = require('commander');
const fs = require('fs');
const graphAPI = require('./graphAPI');
const path = require('path');
const reportUtils = require('./reportUtils');

function warnAboutDepreactedUploadParams(): void {
  console.warn(
    'Option uploadTag, uploadTagPrefix and uploadID is deprecated. Please '
    + 'make sure that your file name contains date stamp, and leave the '
    + 'parameters unset. An uploadTag will be generated automaticially '
    + 'based on the name and size of input file. With skipRowsAlreadyUploaded '
    + 'option, the uploader can upload reliably and make sure each row is '
    + 'uploaded once and only once.'
  );
}

type NormalizeFn = (input: any) => ?any;

type Option = {
  cliOption?: Array<string>,
  conflictOptions?: Array<string>,
  default?: any,
  normalize?: NormalizeFn,
  optional?: boolean,
}

function normalizeNonEmptyString(input: any): ?any {
  return (typeof input === 'string' && input.length > 0) ? input : null;
}

function normalizeFBID(input: any): ?any {
  return (typeof input === 'string' && /^\d+$/.test(input)) ? input : null;
}

function normalizeBoolean(input: any): ?any {
  return input && input != '0' && input != 'false';
}

function normalizePath(input: any): ?any {
  return (typeof input === 'string' && input.length > 0)
    ? path.relative(process.cwd(), path.resolve(input))
    : null;
}

function normalizeAnyObject(input: any): ?any {
  return typeof input === 'object' ? input : null;
}

function getNormalizeNumberFn(min: number, max: number): NormalizeFn {
  return input => {
    const num = parseInt(input, 10);
    return min <= num && num <= max ? num : null;
  };
}

function getNormalizeEnumFn(options: Array<string>): NormalizeFn {
  const optionsInLowerCase = options.map(o => o.toLowerCase());
  return input => {
    if (typeof input === 'string') {
      const inputLowerCase = input.toLowerCase();
      if (optionsInLowerCase.indexOf(inputLowerCase) >= 0) {
        return inputLowerCase;
      }
    }
    return null;
  };
}

const ALL_CONFIG_OPTIONS: {[string]: Option} = {
  accessToken: {
    cliOption: ['--accessToken <accessToken>', 'Access token for API call.'],
    normalize: normalizeNonEmptyString,
  },
  dataSetID: {
    cliOption: [
      '--dataSetID <dataSetID>',
      'Offline event set ID to upload to.',
    ],
    normalize: normalizeFBID,
  },
  uploadTag: {
    cliOption: ['--uploadTag <uploadTag>', 'Upload tag (deprecated).'],
    optional: true,
    conflictOptions: ['uploadTagPrefix', 'uploadID'],
    normalize: (input: any): ?any => {
      warnAboutDepreactedUploadParams();
      return normalizeNonEmptyString(input);
    },
  },
  uploadTagPrefix: {
    cliOption: [
      '--uploadTagPrefix <uploadTagPrefix>',
      'Upload tag prefix (deprecated).',
    ],
    optional: true,
    conflictOptions: ['uploadTag', 'uploadID'],
    normalize: (input: any): ?any => {
      warnAboutDepreactedUploadParams();
      return typeof input === 'string' ? input : null;
    },
  },
  uploadID: {
    cliOption: [
      '--uploadID <uploadID>',
      'Upload ID (deprecated).',
    ],
    optional: true,
    conflictOptions: ['uploadTag', 'uploadTagPrefix'],
    normalize: (input: any): ?any => {
      warnAboutDepreactedUploadParams();
      return normalizeFBID(input);
    },
  },
  skipRowsAlreadyUploaded: {
    cliOption: [
      '--skipRowsAlreadyUploaded',
      'Rows will be skipped if part of the same file was already uploaded '
      + 'before (recommended).',
    ],
    optional: true,
    normalize: normalizeBoolean,
  },
  ignoreSampleErrors: {
    cliOption: [
      '--ignoreSampleErrors',
      'The command will be aborted by default if we encounter too many errors '
      + 'in the samples. Use this option to force execution.',
    ],
    optional: true,
    normalize: normalizeBoolean,
  },
  inputFilePath: {
    cliOption: [
      '--inputFilePath <inputFilePath>',
      'Path of input CSV.',
    ],
    normalize: normalizePath,
  },
  batchSize: {
    cliOption: ['--batchSize <batchSize>', 'Size of batch (1 to 2000).'],
    default: 2000,
    normalize: getNormalizeNumberFn(1, 2000),
  },
  delimiter: {
    cliOption: ['--delimiter <delimiter>', 'Delimiter of the input file.'],
    default: ',',
    normalize: getNormalizeEnumFn([',', ' ', '\t', ';', '|']),
  },
  header: {
    cliOption: [
      '--header',
      'Whether we should skip the header of the input file.',
    ],
    default: false,
    normalize: normalizeBoolean,
  },
  // We are going to have a secondary check for these options. Because their
  // correctness depends on each other as well as the content of the input
  // file.
  mapping: {
    normalize: normalizeAnyObject,
  },
  format: {
    default: {},
    normalize: normalizeAnyObject,
  },
  customTypeInfo: {
    default: {},
    normalize: normalizeAnyObject,
  },
  presetValues: {
    default: {},
    normalize: normalizeAnyObject,
  },
  logging: {
    cliOption: ['--logging <level>', 'Level of logging.'],
    default: 'verbose',
    normalize: getNormalizeEnumFn(
      ['error', 'warn', 'info', 'verbose', 'debug'],
    ),
  },
  namespaceID: {
    cliOption: [
      '--namespaceID <namespaceID>',
      'Namespace ID for third-party ID mapping.',
    ],
    optional: true,
    normalize: normalizeFBID,
  },
  numRowsToValidate: {
    cliOption: [
      '--numRowsToValidate <numRowsToValidate>',
      'Number of rows at top of the file to validate (1 to 1000).',
    ],
    default: 1000,
    normalize: getNormalizeNumberFn(1, 1000),
  },
  preprocessOutputPath: {
    cliOption: [
      '--preprocessOutputPath <preprocessOutputPath>',
      'Output path of preprocessed events.',
    ],
    default: 'preprocess-output.csv',
    normalize: normalizePath,
  },
  reportOutputPath: {
    cliOption: [
      '--reportOutputPath <reportOutputPath>',
      'Output path of report for troubleshooting.',
    ],
    default: 'report.txt',
    normalize: normalizePath,
  },
};

function filterConfigOptions(
  allConfigOptions: {[string]: Option},
  optionsForCommand: Array<string>,
): {[string]: Option} {
  const result = {};
  optionsForCommand.forEach(option => {
    result[option] = allConfigOptions[option];
  });
  return result;
}

const OPTIONS_FOR_UPLOAD = filterConfigOptions(
  ALL_CONFIG_OPTIONS,
  [
    'accessToken',
    'batchSize',
    'customTypeInfo',
    'dataSetID',
    'delimiter',
    'format',
    'header',
    'ignoreSampleErrors',
    'inputFilePath',
    'logging',
    'mapping',
    'namespaceID',
    'presetValues',
    'reportOutputPath',
    'skipRowsAlreadyUploaded',
    'uploadID',
    'uploadTag',
    'uploadTagPrefix',
  ],
);

const OPTIONS_FOR_VALIDATE = filterConfigOptions(
  ALL_CONFIG_OPTIONS,
  [
    'accessToken',
    'customTypeInfo',
    'dataSetID',
    'delimiter',
    'format',
    'header',
    'inputFilePath',
    'logging',
    'mapping',
    'namespaceID',
    'numRowsToValidate',
    'presetValues',
    'reportOutputPath',
  ],
);

const OPTIONS_FOR_PREPROCESS = filterConfigOptions(
  ALL_CONFIG_OPTIONS,
  [
    'customTypeInfo',
    'delimiter',
    'format',
    'header',
    'ignoreSampleErrors',
    'inputFilePath',
    'logging',
    'mapping',
    'preprocessOutputPath',
    'presetValues',
    'reportOutputPath',
  ],
);

const OPTIONS_FOR_UPLOAD_PREPROCESSED = filterConfigOptions(
  ALL_CONFIG_OPTIONS,
  [
    'accessToken',
    'batchSize',
    'dataSetID',
    'ignoreSampleErrors',
    'inputFilePath',
    'logging',
    'namespaceID',
    'reportOutputPath',
    'skipRowsAlreadyUploaded',
    'uploadID',
    'uploadTag',
    'uploadTagPrefix',
  ],
);

function loadConfig(
  configOptions: {[string]: Option},
  argv: Array<string>,
): Object {
  const options = Object.keys(configOptions);

  // Load from commander.
  commander.option('--configFilePath <configFilePath>', 'Path of config file.');
  commander.option(
    '--e2eTestConfigFilePath <e2eTestConfigFilePath>',
    'Path of end-to-end testing config. Only for testing.',
  );
  options.forEach(option => {
    const optionSettings = configOptions[option];
    if (optionSettings.cliOption) {
      commander.option(...optionSettings.cliOption);
    }
  });
  commander.parse(argv);

  // Initialize E2E
  if (commander.e2eTestConfigFilePath) {
    const e2eTestConfigFilePathAbs =
      path.resolve(commander.e2eTestConfigFilePath);
    const e2eTestConfig =
      JSON.parse(fs.readFileSync(e2eTestConfigFilePathAbs, 'utf8'));
    graphAPI.setupE2E(e2eTestConfig);
    reportUtils.setupE2E();
    // $FlowFixMe: Mock out this function so event time normalization returns
    // same result.
    Date.now = () => 1519862400000;
  }

  // Load from config file
  let configFromFile = {};
  if (!commander.configFilePath) {
    const existsOptionThatMustComeFromConfigFile = options.some(option => {
      const optionConfig = configOptions[option];
      return (
        !optionConfig.cliOption &&
        !optionConfig.hasOwnProperty('default') &&
        !optionConfig.optional
      );
    });
    if (existsOptionThatMustComeFromConfigFile) {
      throw new Error('Please specify config file path via --configFilePath.');
    }
  } else {
    const configFilePathAbs = path.resolve(commander.configFilePath);
    const configString = fs.readFileSync(configFilePathAbs, 'utf8');
    configFromFile = JSON.parse(configString);
    if (configFromFile != null && typeof configFromFile !== 'object') {
      throw new Error('Config is not a JSON object.');
    }
  }

  // Resolve config.
  let config = {};
  options.forEach(option => {
    const optionSettings = configOptions[option];

    // Get option from CLI and config file.
    // If both exists, use the one from CLI.
    if (commander.hasOwnProperty(option)) {
      config[option] = commander[option];
      if (configFromFile.hasOwnProperty(option)) {
        console.warn(
          `Option ${option} set in both CLI command and config file. `
          + 'Ignored the one from config file.',
        );
      }
    } else if (configFromFile.hasOwnProperty(option)) {
      config[option] = configFromFile[option];
    } else if (optionSettings.hasOwnProperty('default')) {
      config[option] = optionSettings.default;
    }

    // Normalize option and check conflictions.
    if (config.hasOwnProperty(option)) {
      const normalizer = optionSettings.normalize;
      if (normalizer != null) {
        config[option] = normalizer(config[option]);
        if (config[option] == null) {
          throw new Error(`Option ${option} is invalid.`);
        }
      }
      if (optionSettings.conflictOptions) {
        optionSettings.conflictOptions.forEach(conflictOption => {
          if (config.hasOwnProperty(conflictOption)) {
            throw new Error(
              `Option ${option} is conflicting with ${conflictOption}, `
              + 'you can\'t set both.',
            );
          }
        });
      }
      console.log(
        `Using option ${option}: `,
        typeof config[option] === 'object' || Array.isArray(option)
          ? JSON.stringify(config[option], null, 2)
          : config[option],
      );
    } else {
      if (!optionSettings.optional) {
        throw new Error(
          `Option ${option} is missing and is not optional. `
          + 'Please specify in config file or CLI command.'
        );
      }
    }
  });

  // Raise warning if we see unsupported option.
  Object.keys(configFromFile).forEach(option => {
    if (options.indexOf(option) < 0) {
      console.warn(
        `Ignoring unsupported option ${option}. `
        + 'Please double check spelling and case.',
      );
    }
  });

  return config;
}

function loadConfigOrExit(
  configOptions: {[string]: Option},
): Object {
  try {
    return loadConfig(configOptions, process.argv);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
  // To make flow happy.
  return {};
}

module.exports = {
  loadConfig, // exported for testing.
  loadConfigOrExit,
  OPTIONS_FOR_UPLOAD,
  OPTIONS_FOR_VALIDATE,
  OPTIONS_FOR_PREPROCESS,
  OPTIONS_FOR_UPLOAD_PREPROCESSED,
};
