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
  .mock('path', () => ({
    resolve: jest.fn().mockImplementation(name => 'resolved/' + name),
    relative: jest.fn().mockImplementation((rootPath, absPath) => absPath),
  }))
  .mock('fs', () => {
    let mockContent = {};
    return {
      removeMockFiles: () => {
        mockContent = {};
      },
      mockFile: (path, content) => {
        mockContent[path] = content;
      },
      readFileSync: jest.fn().mockImplementation(path => {
        const content = mockContent[path];
        if (content == null) {
          throw new Error(`File not exist: ${path}`);
        }
        return content;
      }),
    };
  })
  .mock('commander', () => {
    const options = new Map();
    const result = {};
    const optionMock = jest.fn().mockImplementation(o => {
      const parts = o.split(' ');
      expect(parts.length).toBeGreaterThanOrEqual(1);
      expect(parts.length).toBeLessThanOrEqual(2);
      expect(parts[0].length).toBeGreaterThan(2);
      if (parts.length === 1) {
        options.set(parts[0], true);
      } else if (parts.length === 2) {
        options.set(parts[0], false);
      }
    });
    const parseMock = jest.fn().mockImplementation(argv => {
      for (let key in result) {
        if (key !== 'option' && key !== 'parse') {
          delete result[key];
        }
      }
      let i = 0;
      while (i < argv.length) {
        const arg = argv[i];
        if (options.has(arg)) {
          const isBool = options.get(arg);
          if (isBool) {
            result[arg.substr(2)] = true;
            i++;
          } else {
            expect(i + 1).toBeLessThan(argv.length);
            result[arg.substr(2)] = argv[i + 1];
            i += 2;
          }
        } else {
          i++;
        }
      }
    });
    result.option = optionMock;
    result.parse = parseMock;
    return result;
  });

global.console = {
  debug: console.warn, // Use this for debugging.
  warn: jest.fn(),
  log: jest.fn(),
};

beforeEach(() => {
  require('fs').removeMockFiles();
  jest.clearAllMocks();
});

const initConfig = require('../initConfig');

const {
  loadConfig,
  OPTIONS_FOR_UPLOAD,
  OPTIONS_FOR_VALIDATE,
  OPTIONS_FOR_PREPROCESS,
  OPTIONS_FOR_UPLOAD_PREPROCESSED,
  OPTIONS_FOR_UPLOAD_AUDIENCE,
} = initConfig;

describe('general functionality', () => {
  it('empty', () => {
    expect(loadConfig({}, [])).toEqual({});
    expect(console.warn).not.toHaveBeenCalled();
  });

  it('file not exist', () => {
    expect(() => loadConfig(
      {},
      ['--configFilePath', 'not-there'],
    )).toThrow();
    expect(console.warn).not.toHaveBeenCalled();
  });

  it('invalid file content', () => {
    require('fs').mockFile('resolved/cfg', 'not-a-JSON');
    expect(() => loadConfig(
      {},
      ['--configFilePath', 'cfg'],
    )).toThrow();
    expect(console.warn).not.toHaveBeenCalled();
  });

  it('no config file but params provided via CLI/default/optional', () => {
    expect(loadConfig(
      {
        param1: {
          cliOption: ['--param1 <param1>'],
        },
        param2: {
          default: 123,
        },
        param3: {
          optional: true,
        },
      },
      ['--param1', 'abcdef'],
    )).toEqual({param1: 'abcdef', param2: 123});
    expect(console.warn).not.toHaveBeenCalled();
  });

  it('no config file and params can only be passed in file', () => {
    expect(() => loadConfig(
      {
        param1: {},
      },
      [],
    )).toThrow();
    expect(console.warn).not.toHaveBeenCalled();
  });

  it('read options from CLI options and config file', () => {
    require('fs').mockFile('resolved/cfg', JSON.stringify({
      param2: 'cfg-file',
    }));
    expect(loadConfig(
      {
        param1: {
          cliOption: ['--param1 <param1>'],
        },
        param2: {
          cliOption: ['--param2 <param2>'],
        },
      },
      ['--param1', 'cli', '--configFilePath', 'cfg'],
    )).toEqual({
      param1: 'cli',
      param2: 'cfg-file',
    });
    expect(console.warn).not.toHaveBeenCalled();
  });

  it('read option from both CLI and config', () => {
    require('fs').mockFile('resolved/cfg', JSON.stringify({
      param1: 'cfg-file',
    }));
    expect(loadConfig(
      {
        param1: {
          cliOption: ['--param1 <param1>'],
        },
      },
      ['--param1', 'cli', '--configFilePath', 'cfg'],
    )).toEqual({
      param1: 'cli',
    });
    expect(console.warn).toHaveBeenCalledTimes(1);
  });

  it('invalid option', () => {
    expect(() => loadConfig(
      {
        param1: {
          normalize: () => false,
        },
      },
      ['--param1', 'will-fail-normalize'],
    )).toThrow();
    expect(console.warn).not.toHaveBeenCalled();
  });

  it('conflicting option', () => {
    const optionConfigs = {
      param1: {
        cliOption: ['--param1 <param1>'],
        conflictOptions: ['param2'],
        optional: true,
      },
      param2: {
        cliOption: ['--param2 <param2>'],
        conflictOptions: ['param1'],
        optional: true,
      },
    };
    expect(loadConfig(
      optionConfigs,
      ['--param1', 'value1'],
    )).toEqual({param1: 'value1'});
    expect(loadConfig(
      optionConfigs,
      ['--param2', 'value2'],
    )).toEqual({param2: 'value2'});
    expect(() => loadConfig(
      optionConfigs,
      ['--param1', 'value1', '--param2', 'value2'],
    )).toThrow();
    expect(console.warn).not.toHaveBeenCalled();
  });

  it('default value', () => {
    const optionConfigs = {
      param1: {
        cliOption: ['--param1 <param1>'],
        default: 'epic',
      },
    };
    expect(loadConfig(
      optionConfigs,
      [],
    )).toEqual({param1: 'epic'});
    expect(loadConfig(
      optionConfigs,
      ['--param1', 'noodle-bar'],
    )).toEqual({param1: 'noodle-bar'});
    require('fs').mockFile('resolved/cfg', JSON.stringify({
      param1: 'ltd',
    }));
    expect(loadConfig(
      optionConfigs,
      ['--configFilePath', 'cfg'],
    )).toEqual({param1: 'ltd'});
    expect(console.warn).not.toHaveBeenCalled();
  });

  it('missing required option', () => {
    require('fs').mockFile('resolved/cfg', JSON.stringify({}));
    expect(() => loadConfig(
      {
        param1: {
          cliOption: ['--param1 <param1>'],
        },
      },
      ['--configFilePath', 'cfg'],
    )).toThrow();
    expect(console.warn).not.toHaveBeenCalled();
  });

  it('unsupported option', () => {
    require('fs').mockFile('resolved/cfg', JSON.stringify({
      param1: 'x',
      param2: 'y',
    }));
    expect(loadConfig(
      {
        param1: {},
      },
      ['--configFilePath', 'cfg'],
    )).toEqual({param1: 'x'});
    expect(console.warn).toHaveBeenCalledTimes(1);
  });
});

describe('upload', () => {
  const baseParams = {
    accessToken: '<ACCESS_TOKEN>',
    dataSetID: '1234567890',
    inputFilePath: 'input.csv',
    mapping: {},
  };

  it('recommended', () => {
    require('fs').mockFile('resolved/cfg', JSON.stringify({
      ...baseParams,
      skipRowsAlreadyUploaded: true,
    }));
    expect(loadConfig(
      OPTIONS_FOR_UPLOAD,
      ['--configFilePath', 'cfg'],
    )).toEqual({
      ...baseParams,
      batchSize: 2000,
      customTypeInfo: {},
      delimiter: ',',
      format: {},
      header: false,
      logging: 'verbose',
      presetValues: {},
      inputFilePath: 'resolved/input.csv',
      reportOutputPath: 'resolved/report.txt',
      skipRowsAlreadyUploaded: true,
    });
    expect(console.warn).not.toHaveBeenCalled();
  });

  it('legacy upload ID/Tag/TagPrefix support', () => {
    require('fs').mockFile('resolved/cfg1', JSON.stringify({
      ...baseParams,
      uploadID: '1234567890',
    }));
    require('fs').mockFile('resolved/cfg2', JSON.stringify({
      ...baseParams,
      uploadTag: 'upload-tag',
    }));
    require('fs').mockFile('resolved/cfg3', JSON.stringify({
      ...baseParams,
      uploadTagPrefix: 'upload-tag-prefix',
    }));
    require('fs').mockFile('resolved/cfg4', JSON.stringify({
      ...baseParams,
      uploadID: '1234567890',
      uploadTag: 'upload-tag',
    }));
    require('fs').mockFile('resolved/cfg5', JSON.stringify({
      ...baseParams,
      uploadTag: 'upload-tag',
      uploadTagPrefix: 'upload-tag-prefix',
    }));
    require('fs').mockFile('resolved/cfg6', JSON.stringify({
      ...baseParams,
      uploadID: '1234567890',
      uploadTagPrefix: 'upload-tag-prefix',
    }));
    expect(loadConfig(
      OPTIONS_FOR_UPLOAD,
      ['--configFilePath', 'cfg1'],
    )).toMatchObject({uploadID: '1234567890'});
    expect(loadConfig(
      OPTIONS_FOR_UPLOAD,
      ['--configFilePath', 'cfg2'],
    )).toMatchObject({uploadTag: 'upload-tag'});
    expect(loadConfig(
      OPTIONS_FOR_UPLOAD,
      ['--configFilePath', 'cfg3'],
    )).toMatchObject({uploadTagPrefix: 'upload-tag-prefix'});
    expect(console.warn).toHaveBeenCalledTimes(3);
    expect(() => loadConfig(
      OPTIONS_FOR_UPLOAD,
      ['--configFilePath', 'cfg4'],
    )).toThrow();
    expect(() => loadConfig(
      OPTIONS_FOR_UPLOAD,
      ['--configFilePath', 'cfg5'],
    )).toThrow();
    expect(() => loadConfig(
      OPTIONS_FOR_UPLOAD,
      ['--configFilePath', 'cfg6'],
    )).toThrow();
  });

  it('all available options except upload ID/Tag/TagPrefix', () => {
    const params = {
      ...baseParams,
      batchSize: 500,
      customTypeInfo: {discount: {baseType: 'number'}},
      delimiter: '\t',
      format: {event_time: {timeFormat: 'ISO8601', timeZone: 0}},
      header: true,
      ignoreSampleErrors: true,
      logging: 'info',
      namespaceID: '666666',
      presetValues: {currency: 'USD'},
      reportOutputPath: 'myreport.txt',
      skipRowsAlreadyUploaded: false,
    };
    require('fs').mockFile('resolved/cfg', JSON.stringify(params));
    expect(loadConfig(
      OPTIONS_FOR_UPLOAD,
      ['--configFilePath', 'cfg'],
    )).toEqual({
      ...params,
      inputFilePath: 'resolved/input.csv',
      reportOutputPath: 'resolved/myreport.txt',
    });
    expect(console.warn).not.toHaveBeenCalled();
  });

  it('reject invalid options', () => {
    // IDs in number are rejected because
    // JavaScript float precision is not enough for 64 ints.
    const invalidParams = [
      {accessToken: ''},
      {accessToken: null},
      {dataSetID: 'not-a-number'},
      {dataSetID: 111111},
      {uploadTag: ''},
      {uploadTagPrefix: 123},
      {uploadID: 'not-a-number'},
      {uploadID: 222222},
      {inputFilePath: ''},
      {inputFilePath: null},
      {batchSize: 0},
      {batchSize: -1},
      {batchSize: 2001},
      {batchSize: 'not-a-number'},
      {delimiter: '-'},
      {mapping: 'event_name'},
      {format: null},
      {format: 'YYYY/MM/DD'},
      {customTypeInfo: null},
      {customTypeInfo: 'string'},
      {presetValues: null},
      {presetValues: 'USD'},
      {logging: 'none'},
      {namespaceID: ''},
      {namespaceID: 333333},
      {reportOutputPath: null},
      {reportOutputPath: ''},
    ];
    invalidParams.forEach((param, i) => {
      require('fs').mockFile(`resolved/cfg-${i}`, JSON.stringify({
        ...baseParams,
        ...param,
      }));
    });
    invalidParams.forEach((param, i) => {
      expect(() => loadConfig(
        OPTIONS_FOR_UPLOAD,
        ['--configFilePath', `cfg-${i}`],
      )).toThrow();
    });
  });

  it('warn about unsupported options', () => {
    const unsupportedParams = [
      {numRowsToValidate: 1000},
      {validateOutputPath: 'validate.txt'},
      {preprocessOutputPath: 'hashed.csv'},
    ];
    unsupportedParams.forEach((param, i) => {
      require('fs').mockFile(`resolved/cfg-${i}`, JSON.stringify({
        ...baseParams,
        ...param,
      }));
    });
    unsupportedParams.forEach((param, i) => {
      expect(() => loadConfig(
        OPTIONS_FOR_UPLOAD,
        ['--configFilePath', `cfg-${i}`],
      )).not.toThrow();
    });
    expect(console.warn).toHaveBeenCalledTimes(unsupportedParams.length);
  });
});

describe('validate', () => {
  const baseParams = {
    accessToken: '<ACCESS_TOKEN>',
    dataSetID: '1234567890',
    inputFilePath: 'input.csv',
    mapping: {},
  };

  it('minimum', () => {
    require('fs').mockFile('resolved/cfg', JSON.stringify(baseParams));
    expect(loadConfig(
      OPTIONS_FOR_VALIDATE,
      ['--configFilePath', 'cfg'],
    )).toEqual({
      ...baseParams,
      customTypeInfo: {},
      delimiter: ',',
      format: {},
      header: false,
      logging: 'verbose',
      presetValues: {},
      reportOutputPath: 'resolved/report.txt',
      numRowsToValidate: 1000,
      inputFilePath: 'resolved/input.csv',
    });
    expect(console.warn).not.toHaveBeenCalled();
  });

  it('all available options', () => {
    const params = {
      ...baseParams,
      customTypeInfo: {discount: {baseType: 'number'}},
      delimiter: '\t',
      format: {event_time: {timeFormat: 'ISO8601', timeZone: 0}},
      header: true,
      logging: 'info',
      namespaceID: '666666',
      presetValues: {currency: 'USD'},
      numRowsToValidate: 500,
      reportOutputPath: 'validate-report.txt',
    };
    require('fs').mockFile('resolved/cfg', JSON.stringify(params));
    expect(loadConfig(
      OPTIONS_FOR_VALIDATE,
      ['--configFilePath', 'cfg'],
    )).toEqual({
      ...params,
      inputFilePath: 'resolved/input.csv',
      reportOutputPath: 'resolved/validate-report.txt',
    });
    expect(console.warn).not.toHaveBeenCalled();
  });

  it('reject invalid options', () => {
    const invalidParams = [
      {reportOutputPath: ''},
      {reportOutputPath: null},
      {numRowsToValidate: 1001},
      {numRowsToValidate: 0},
      {numRowsToValidate: -1},
      {numRowsToValidate: 'not-a-number'},
    ];
    invalidParams.forEach((param, i) => {
      require('fs').mockFile(`resolved/cfg-${i}`, JSON.stringify({
        ...baseParams,
        ...param,
      }));
    });
    invalidParams.forEach((param, i) => {
      expect(() => loadConfig(
        OPTIONS_FOR_VALIDATE,
        ['--configFilePath', `cfg-${i}`],
      )).toThrow();
    });
  });

  it('warn about unsupported options', () => {
    const unsupportedParams = [
      {uploadTag: 'upload-tag'},
      {uploadTagPrefix: ''},
      {uploadID: '123456'},
      {skipRowsAlreadyUploaded: true},
      {batchSize: 500},
      {preprocessOutputPath: 'hashed.csv'},
      {ignoreSampleErrors: true},
    ];
    unsupportedParams.forEach((param, i) => {
      require('fs').mockFile(`resolved/cfg-${i}`, JSON.stringify({
        ...baseParams,
        ...param,
      }));
    });
    unsupportedParams.forEach((param, i) => {
      expect(() => loadConfig(
        OPTIONS_FOR_VALIDATE,
        ['--configFilePath', `cfg-${i}`],
      )).not.toThrow();
    });
    expect(console.warn).toHaveBeenCalledTimes(unsupportedParams.length);
  });
});

describe('preprocess', () => {
  const baseParams = {
    inputFilePath: 'input.csv',
    mapping: {},
  };

  it('minimum', () => {
    require('fs').mockFile('resolved/cfg', JSON.stringify(baseParams));
    expect(loadConfig(
      OPTIONS_FOR_PREPROCESS,
      ['--configFilePath', 'cfg'],
    )).toEqual({
      customTypeInfo: {},
      delimiter: ',',
      format: {},
      header: false,
      inputFilePath: 'resolved/input.csv',
      logging: 'verbose',
      mapping: {},
      preprocessOutputPath: 'resolved/preprocess-output.csv',
      reportOutputPath: 'resolved/report.txt',
      presetValues: {},
    });
    expect(console.warn).not.toHaveBeenCalled();
  });

  it('all available options', () => {
    const params = {
      ...baseParams,
      customTypeInfo: {discount: {baseType: 'number'}},
      delimiter: '\t',
      format: {event_time: {timeFormat: 'ISO8601', timeZone: 0}},
      header: true,
      ignoreSampleErrors: true,
      logging: 'info',
      preprocessOutputPath: 'hashed.csv',
      presetValues: {currency: 'USD'},
      reportOutputPath: 'myreport.txt',
    };
    require('fs').mockFile('resolved/cfg', JSON.stringify(params));
    expect(loadConfig(
      OPTIONS_FOR_PREPROCESS,
      ['--configFilePath', 'cfg'],
    )).toEqual({
      ...params,
      inputFilePath: 'resolved/input.csv',
      preprocessOutputPath: 'resolved/hashed.csv',
      reportOutputPath: 'resolved/myreport.txt',
    });
    expect(console.warn).not.toHaveBeenCalled();
  });

  it('reject invalid options', () => {
    const invalidParams = [
      {preprocessOutputPath: ''},
      {preprocessOutputPath: null},
    ];
    invalidParams.forEach((param, i) => {
      require('fs').mockFile(`resolved/cfg-${i}`, JSON.stringify({
        ...baseParams,
        ...param,
      }));
    });
    invalidParams.forEach((param, i) => {
      expect(() => loadConfig(
        OPTIONS_FOR_PREPROCESS,
        ['--configFilePath', `cfg-${i}`],
      )).toThrow();
    });
  });

  it('warn about unsupported options', () => {
    const unsupportedParams = [
      {accessToken: '<ACCESS_TOKEN>'},
      {dataSetID: '123456789'},
      {uploadTag: 'upload-tag'},
      {uploadTagPrefix: ''},
      {uploadID: '123456'},
      {skipRowsAlreadyUploaded: true},
      {batchSize: 500},
      {namespaceID: '666666'},
      {numRowsToValidate: 1000},
    ];
    unsupportedParams.forEach((param, i) => {
      require('fs').mockFile(`resolved/cfg-${i}`, JSON.stringify({
        ...baseParams,
        ...param,
      }));
    });
    unsupportedParams.forEach((param, i) => {
      expect(() => loadConfig(
        OPTIONS_FOR_PREPROCESS,
        ['--configFilePath', `cfg-${i}`],
      )).not.toThrow();
    });
    expect(console.warn).toHaveBeenCalledTimes(unsupportedParams.length);
  });
});

describe('upload-preprocessed', () => {
  const baseParams = {
    accessToken: '<ACCESS_TOKEN>',
    dataSetID: '1234567890',
    inputFilePath: 'input.csv',
  };

  it('minimum', () => {
    require('fs').mockFile('resolved/cfg', JSON.stringify(baseParams));
    expect(loadConfig(
      OPTIONS_FOR_UPLOAD_PREPROCESSED,
      ['--configFilePath', 'cfg'],
    )).toEqual({
      accessToken: '<ACCESS_TOKEN>',
      batchSize: 2000,
      dataSetID: '1234567890',
      inputFilePath: 'resolved/input.csv',
      logging: 'verbose',
      reportOutputPath: 'resolved/report.txt',
    });
    expect(console.warn).not.toHaveBeenCalled();
  });

  it('all available options except upload ID/Tag/TagPrefix', () => {
    const params = {
      ...baseParams,
      batchSize: 500,
      logging: 'info',
      namespaceID: '666666',
      skipRowsAlreadyUploaded: true,
      reportOutputPath: 'myreport.txt',
      ignoreSampleErrors: true,
    };
    require('fs').mockFile('resolved/cfg', JSON.stringify(params));
    expect(loadConfig(
      OPTIONS_FOR_UPLOAD_PREPROCESSED,
      ['--configFilePath', 'cfg'],
    )).toEqual({
      ...params,
      inputFilePath: 'resolved/input.csv',
      reportOutputPath: 'resolved/myreport.txt',
    });
    expect(console.warn).not.toHaveBeenCalled();
  });

  it('warn about unsupported options', () => {
    const unsupportedParams = [
      {delimiter: '|'},
      {header: false},
      {mapping: {}},
      {format: {}},
      {customTypeInfo: {}},
      {presetValues: {}},
      {numRowsToValidate: 500},
      {preprocessOutputPath: 'hashed.csv'},
    ];
    unsupportedParams.forEach((param, i) => {
      require('fs').mockFile(`resolved/cfg-${i}`, JSON.stringify({
        ...baseParams,
        ...param,
      }));
    });
    unsupportedParams.forEach((param, i) => {
      expect(() => loadConfig(
        OPTIONS_FOR_UPLOAD_PREPROCESSED,
        ['--configFilePath', `cfg-${i}`],
      )).not.toThrow();
    });
    expect(console.warn).toHaveBeenCalledTimes(unsupportedParams.length);
  });
});

describe('upload-audience', () => {
  const baseParams = {
    accessToken: '<ACCESS_TOKEN>',
    inputFilePath: 'input.csv',
    mapping: {},
  };

  it('minimum', () => {
    require('fs').mockFile('resolved/cfg', JSON.stringify({
      ...baseParams,
    }));
    expect(loadConfig(
      OPTIONS_FOR_UPLOAD_AUDIENCE,
      ['--configFilePath', 'cfg'],
    )).toEqual({
      ...baseParams,
      batchSize: 2000,
      delimiter: ',',
      format: {},
      header: false,
      inputFilePath: 'resolved/input.csv',
      logging: 'verbose',
      removeUsers: false,
      reportOutputPath: 'resolved/report.txt',
    });
    expect(console.warn).not.toHaveBeenCalled();
  });

  it('all available options', () => {
    const params = {
      ...baseParams,
      ignoreSampleErrors: true,
      batchSize: 500,
      delimiter: '\t',
      format: {dob: 'MM/DD/YYYY'},
      header: true,
      logging: 'info',
      reportOutputPath: 'myreport.txt',
      removeUsers: true,
      adAccountID: 'act_123',
      customAudienceID: '123456',
      appIDs: ['111', '222'],
      pageIDs: ['333', '444'],
    };
    require('fs').mockFile('resolved/cfg', JSON.stringify(params));
    expect(loadConfig(
      OPTIONS_FOR_UPLOAD_AUDIENCE,
      ['--configFilePath', 'cfg'],
    )).toEqual({
      ...params,
      adAccountID: '123',
      inputFilePath: 'resolved/input.csv',
      reportOutputPath: 'resolved/myreport.txt',
    });
    expect(console.warn).not.toHaveBeenCalled();
  });

  it('reject invalid options', () => {
    const invalidParams = [
      {adAccountID: 'act_abc'},
      {adAccountID: 'abc'},
      {customAudienceID: 'act_123'},
      {customAudienceID: 'abc'},
      {appIDs: ['111', 'xyz']},
      {appIDs: '111'},
      {pageIDs: ['xyz', '444']},
      {pageIDs: '444'},
    ];
    invalidParams.forEach((param, i) => {
      require('fs').mockFile(`resolved/cfg-${i}`, JSON.stringify({
        ...baseParams,
        ...param,
      }));
    });
    invalidParams.forEach((param, i) => {
      expect(() => loadConfig(
        OPTIONS_FOR_UPLOAD_AUDIENCE,
        ['--configFilePath', `cfg-${i}`],
      )).toThrow();
    });
  });

  it('warn about unsupported options', () => {
    const unsupportedParams = [
      {dataSetID: '123'},
      {uploadTag: 'upload-tag'},
      {uploadTagPrefix: 'upload-tag-prefix'},
      {uploadID: '123'},
      {skipRowsAlreadyUploaded: true},
      {customTypeInfo: {}},
      {presetValues: {}},
      {namespaceID: '123'},
      {numRowsToValidate: 500},
      {preprocessOutputPath: 'hashed.csv'},
    ];
    unsupportedParams.forEach((param, i) => {
      require('fs').mockFile(`resolved/cfg-${i}`, JSON.stringify({
        ...baseParams,
        ...param,
      }));
    });
    unsupportedParams.forEach((param, i) => {
      expect(() => loadConfig(
        OPTIONS_FOR_UPLOAD_AUDIENCE,
        ['--configFilePath', `cfg-${i}`],
      )).not.toThrow();
    });
    expect(console.warn).toHaveBeenCalledTimes(unsupportedParams.length);
  });
});
