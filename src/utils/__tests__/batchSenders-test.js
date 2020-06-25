/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */
/* eslint-disable max-len */

'use strict';

const DEFAULT_GRAPH_API_VERSION_FOR_E2E = 'v7.0';

jest
  .mock('winston', () => ({debug: jest.fn(), warn: jest.fn()}))
  .mock('fs', () => {
    const data = {
      paths: [],
      content: [],
    };
    const openSync = (path, mode) => {
      expect(mode).toBe('w');
      data.paths.push(path);
      data.content.push('');
      return data.paths.length - 1;
    };
    const appendFileSync = (fd, str) => {
      expect(data.content[fd]).not.toBeNull();
      data.content[fd] += str;
    };
    const appendFile = (fd, str, cb) => {
      setTimeout(() => {
        appendFileSync(fd, str);
        cb();
      }, 0);
    };
    const getContentForPath = (path) => {
      const index = data.paths.indexOf(path);
      return data.content[index];
    };
    const reset = () => {
      data.paths = [];
      data.content = [];
    };
    return {
      openSync,
      appendFileSync,
      appendFile,
      reset,
      getContentForPath,
    };
  })
  .mock('../graphAPIUtils');

beforeEach(() => {
  require('fs').reset();
  require('../graphAPIUtils').graphAPI.reset();
  require('../graphAPIUtils').setupGraphAPIVersion('<ACCESS_TOKEN>', DEFAULT_GRAPH_API_VERSION_FOR_E2E);
});

const batchSenders = require('../batchSenders');

const {
  getCustomAudienceBatchSender,
  getOfflineEventsBatchSender,
  getPseudoBatchSenderForPreprocessing,
} = batchSenders;

test('getOfflineEventsBatchSender without progress tracking', async () => {
  const {graphAPI} = require('../graphAPIUtils');
  const sender = getOfflineEventsBatchSender(
    '<ACCESS_TOKEN>',
    '111111',
    '222222',
    null,
    false,
  );
  const sendPromise1 = sender({
    start: 10,
    end: 30,
    rows: [{mock: 'row1'}, {mock: 'row2'}],
  });
  sendPromise1.catch(jest.fn());
  expect(graphAPI.hasRequest()).toBe(true);
  expect(graphAPI.getLastRequest().argv).toEqual({
    path: '111111/events',
    method: 'POST',
    params: {
      access_token: '<ACCESS_TOKEN>',
      upload_id: '222222',
      upload_source: 'MDFU V2.00',
      data: [{mock: 'row1'}, {mock: 'row2'}],
      suppress_http_code: 1,
    },
    version: DEFAULT_GRAPH_API_VERSION_FOR_E2E,
  });
  const sendPromise2 = sender({
    start: 30,
    end: 40,
    rows: [{mock: 'row3'}],
  });
  expect(graphAPI.getLastRequest().argv).toEqual({
    path: '111111/events',
    method: 'POST',
    params: {
      access_token: '<ACCESS_TOKEN>',
      upload_id: '222222',
      upload_source: 'MDFU V2.00',
      data: [{mock: 'row3'}],
      suppress_http_code: 1,
    },
    version: DEFAULT_GRAPH_API_VERSION_FOR_E2E,
  });

  await graphAPI.resolveLastRequest();
  await sendPromise2;
  await graphAPI.rejectLastRequest(new Error('Ouch!'));
  await expect(sendPromise1).rejects.toThrow();

  expect(graphAPI.hasRequest()).toBe(false);
});

describe('getCustomAudienceBatchSender', async () => {
  const configs = [
    {
      description: 'Add ordinary audience',
      method: 'POST',
      mapping: {
        '0': 'email',
        '1': 'phone',
      },
      rows: [
        {email: '<EMAIL>'},
        {phone: '<PHONE>'},
      ],
      expectedSchema: ['EMAIL', 'PHONE'],
      expectedData: [
        ['<EMAIL>', ''],
        ['', '<PHONE>'],
      ],
    },
    {
      description: 'Remove ordinary audience',
      method: 'DELETE',
      mapping: {
        '0': 'email',
        '1': 'phone',
      },
      rows: [
        {email: '<EMAIL>', phone: '<PHONE>'},
      ],
      expectedSchema: ['EMAIL', 'PHONE'],
      expectedData: [
        ['<EMAIL>', '<PHONE>'],
      ],
    },
    {
      description: 'Add ordinary audience with age & dob',
      method: 'DELETE',
      mapping: {
        '0': 'dob',
        '1': 'age',
      },
      rows: [
        {doby: '<DOBY>', dobm: '<DOBM>', dobd: '<DOBD>'},
      ],
      expectedSchema: ['DOBY', 'DOBM', 'DOBD'],
      expectedData: [
        ['<DOBY>', '<DOBM>', '<DOBD>'],
      ],
    },
    {
      description: 'Add ordinary audience with fn, ln, dob',
      method: 'POST',
      mapping: {
        '0': 'fn',
        '1': 'ln',
        '2': 'dob',
      },
      rows: [
        {
          fn: '<FN>',
          f5first: '<F5FIRST>',
          fi: '<FI>',
          ln: '<LN>',
          f5last: '<F5LAST>',
          doby: '<DOBY>',
          dobm: '<DOBM>',
          dobd: '<DOBD>',
        },
      ],
      expectedSchema: [
        'FN',
        'FI',
        'F5FIRST',
        'LN',
        'F5LAST',
        'DOBY',
        'DOBM',
        'DOBD',
      ],
      expectedData: [
        [
          '<FN>',
          '<FI>',
          '<F5FIRST>',
          '<LN>',
          '<F5LAST>',
          '<DOBY>',
          '<DOBM>',
          '<DOBD>',
        ],
      ],
    },
    {
      description: 'Add ordinary audience with more than one emails/phones',
      method: 'POST',
      mapping: {
        '0': 'email',
        '1': 'phone',
        '2': 'email',
        '3': 'phone',
      },
      rows: [
        {email: '<EMAIL>', phone: '<PHONE>'},
        {email: ['<EMAIL>'], phone: ['<PHONE>']},
        {email: ['<EMAIL1>', '<EMAIL2>'], phone: ['<PHONE1>', '<PHONE2>']},
        {email: ['<EMAIL>'], phone: []},
        {phone: '<PHONE>'}
      ],
      expectedSchema: ['EMAIL', 'PHONE', 'EMAIL', 'PHONE'],
      expectedData: [
        ['<EMAIL>', '<PHONE>', '', ''],
        ['<EMAIL>', '<PHONE>', '', ''],
        ['<EMAIL1>', '<PHONE1>', '<EMAIL2>', '<PHONE2>'],
        ['<EMAIL>', '', '', ''],
        ['', '<PHONE>', '', ''],
      ],
    },
    {
      description: 'Add ordinary audience with appIDs/pageIDs',
      method: 'POST',
      mapping: {
        '0': 'pageuid',
        '1': 'appuid',
      },
      rows: [
        {pageuid: '<PAGEUID>'},
        {appuid: '<APPUID>'},
      ],
      pageIDs: ['<PAGEID>'],
      appIDs: ['<APPID>'],
      expectedSchema: ['PAGEUID', 'APPUID'],
      expectedData: [
        ['<PAGEUID>', ''],
        ['', '<APPUID>'],
      ],
    },
    {
      description: 'Add WLAL audience',
      method: 'POST',
      mapping: {
        '0': 'match_keys.email',
        '1': 'match_keys.phone',
        '2': 'lookalike_value',
      },
      rows: [
        {match_keys: {email: '<EMAIL>'}, lookalike_value: 1},
        {match_keys: {phone: '<PHONE>'}, lookalike_value: 2},
      ],
      expectedSchema: ['EMAIL', 'PHONE', 'LOOKALIKE_VALUE'],
      expectedData: [
        ['<EMAIL>', '', 1],
        ['', '<PHONE>', 2],
      ],
    },
    {
      description: 'Remove WLAL audience',
      method: 'DELETE',
      mapping: {
        '0': 'match_keys.email',
        '1': 'match_keys.phone',
        '2': 'lookalike_value',
      },
      rows: [
        {match_keys: {email: '<EMAIL>', phone: '<PHONE>'}, lookalike_value: 1},
      ],
      expectedSchema: ['EMAIL', 'PHONE', 'LOOKALIKE_VALUE'],
      expectedData: [
        ['<EMAIL>', '<PHONE>', 1],
      ],
    },
    {
      description: 'Add WLAL audience without match_keys prefix',
      method: 'POST',
      mapping: {
        '0': 'email',
        '1': 'phone',
        '2': 'lookalike_value',
      },
      rows: [
        {match_keys: {email: '<EMAIL>'}, lookalike_value: 1},
        {match_keys: {phone: '<PHONE>'}, lookalike_value: 2},
      ],
      expectedSchema: ['EMAIL', 'PHONE', 'LOOKALIKE_VALUE'],
      expectedData: [
        ['<EMAIL>', '', 1],
        ['', '<PHONE>', 2],
      ],
    },
  ];

  configs.map(cfg =>
    it(cfg.description, async () => {
      const {graphAPI} = require('../graphAPIUtils');
      const {
        batchSender,
        lastDummyBatchSender,
      } = getCustomAudienceBatchSender(
        '<ACCESS_TOKEN>',
        '<AUDIENCE_ID>',
        123456, // Session ID.
        cfg.mapping,
        cfg.method,
        cfg.appIDs || null,
        cfg.pageIDs || null,
      );

      const sendPromise1 = batchSender({
        start: 0,
        end: 10,
        rows: cfg.rows,
      });

      expect(graphAPI.hasRequest()).toBe(true);
      expect(graphAPI.getLastRequest().argv).toEqual({
        path: '<AUDIENCE_ID>/users',
        method: cfg.method,
        params: {
          access_token: '<ACCESS_TOKEN>',
          payload: {
            schema: cfg.expectedSchema,
            data: cfg.expectedData,
            app_ids: cfg.appIDs || null,
            page_ids: cfg.pageIDs || null,
          },
          session: {
            last_batch_flag: false,
            session_id: 123456,
          }
        },
        version: DEFAULT_GRAPH_API_VERSION_FOR_E2E,
      });
      await graphAPI.resolveLastRequest();
      await sendPromise1;

      const sendPromise2 =  lastDummyBatchSender();
      expect(graphAPI.hasRequest()).toBe(true);
      expect(graphAPI.getLastRequest().argv).toEqual({
        path: '<AUDIENCE_ID>/users',
        method: cfg.method,
        params: {
          access_token: '<ACCESS_TOKEN>',
          payload: {
            schema: cfg.expectedSchema,
            data: [cfg.expectedSchema.map(() => '1')],
            app_ids: cfg.appIDs || null,
            page_ids: cfg.pageIDs || null,
          },
          session: {
            batch_seq: 1,
            last_batch_flag: true,
            session_id: 123456,
          }
        },
        version: DEFAULT_GRAPH_API_VERSION_FOR_E2E,
      });
      await graphAPI.resolveLastRequest();
      await sendPromise2;

      expect(graphAPI.hasRequest()).toBe(false);
    }),
  );
});

describe('getPseudoBatchSenderForPreprocessing', async () => {
  it('multiple batches', async () => {
    const {sender} = getPseudoBatchSenderForPreprocessing(
      'path/to/preprocessed.csv',
      {
        '0': 'event_name',
        '1': 'event_time',
        '2': 'match_keys.fn',
        '3': 'match_keys.ln',
        '4': 'match_keys.dob',
        '5': 'match_keys.age',
        '6': 'match_keys.email',
        '7': 'custom_data.some_number',
        '8': 'custom_data.some_text',
      },
      {
        some_number: {baseType: 'number'},
        some_text: {baseType: 'text'},
      },
      {},
    );
    await sender({
      start: 10,
      end: 30,
      rows: [
        {
          event_name: 'Lead',
          event_time: 10000001,
          match_keys: {
            email: 'hashed-email-1',
            fn: 'hashed-fn-1',
            fi: 'hashed-fi-1',
            f5first: 'hashed-f5first-1',
            ln: 'hashed-ln-1',
            f5last: 'hashed-f5last-1',
          },
          custom_data: {
            some_number: 1111,
          },
        },
        {
          event_name: 'Other',
          event_time: 10000002,
          match_keys: {
            email: 'hashed-email-2',
            doby: 'hashed-doby-2',
            dobm: 'hashed-dobm-2',
            dobd: 'hashed-dobd-2',
          },
          custom_data: {
            some_text: 'bbbb',
          },
        },
      ],
    });
    await sender({
      start: 30,
      end: 50,
      rows: [
        {
          event_name: 'AddToCart',
          event_time: 10000003,
          match_keys: {
            email: 'hashed-email-3',
            doby: 'hashed-doby-3',
          },
          custom_data: {
            some_number: 3333,
            some_text: 'cccc',
          },
        },
        {
          event_name: 'Lead',
          event_time: 10000004,
          match_keys: {
            email: 'hashed-email-4',
            doby: 'hashed-doby-4',
          },
        }
      ],
    });
    const output = require('fs').getContentForPath('path/to/preprocessed.csv');
    const expectedOutput =
`event_name,event_time,match_keys.fn,match_keys.fi,match_keys.f5first,match_keys.ln,match_keys.f5last,match_keys.doby,match_keys.dobm,match_keys.dobd,match_keys.email,custom_data.some_number:number,custom_data.some_text:text
Lead,10000001,hashed-fn-1,hashed-fi-1,hashed-f5first-1,hashed-ln-1,hashed-f5last-1,,,,hashed-email-1,1111,
Other,10000002,,,,,,hashed-doby-2,hashed-dobm-2,hashed-dobd-2,hashed-email-2,,bbbb
AddToCart,10000003,,,,,,hashed-doby-3,,,hashed-email-3,3333,cccc
Lead,10000004,,,,,,hashed-doby-4,,,hashed-email-4,,
`;
    expect(output).toBe(expectedOutput);
  });

  it('should escape', async () => {
    const {sender} = getPseudoBatchSenderForPreprocessing(
      'path/to/preprocessed.csv',
      {
        '0': 'match_keys.email',
        '1': 'event_name',
        '2': 'event_time',
        '3': 'custom_data.some_text',
      },
      {},
      {},
    );
    await sender({
      start: 0,
      end: 30,
      rows: [
        {
          event_name: 'Lead',
          event_time: 1000000,
          match_keys: {email: 'hashed-email-1'},
          custom_data: {some_text: 'should escape "'}
        },
        {
          event_name: 'Lead',
          event_time: 1000001,
          match_keys: {email: 'hashed-email-2'},
          custom_data: {some_text: 'should escape ,'}
        },
        {
          event_name: 'Lead',
          event_time: 1000002,
          match_keys: {email: 'hashed-email-3'},
          custom_data: {some_text: 'should escape \n'}
        },
      ],
    });
    const output = require('fs').getContentForPath('path/to/preprocessed.csv');
    const expectedOutput =
`match_keys.email,event_name,event_time,custom_data.some_text:text
hashed-email-1,Lead,1000000,"should escape """
hashed-email-2,Lead,1000001,"should escape ,"
hashed-email-3,Lead,1000002,"should escape \n"
`;
    expect(output).toBe(expectedOutput);
  });

  it('should output multiple fields properly', async () => {
    const {sender} = getPseudoBatchSenderForPreprocessing(
      'path/to/preprocessed.csv',
      {
        '0': 'match_keys.email',
        '1': 'match_keys.email',
        '2': 'match_keys.email',
        '3': 'match_keys.phone',
        '4': 'match_keys.phone',
        '5': 'event_name',
        '6': 'event_time',
      },
      {},
      {},
    );
    await sender({
      start: 0,
      end: 30,
      rows: [
        {
          event_name: 'Lead',
          event_time: 1000000,
          match_keys: {
            email: 'hashed-email-1',
            phone: ['hashed-phone-1a', 'hashed-phone-1b'],
          },
        },
        {
          event_name: 'Lead',
          event_time: 1000001,
          match_keys: {
            email: ['hashed-email-2a', 'hashed-email-2b', 'hashed-email-2c'],
            phone: 'hashed-phone-2',
          },
        },
        {
          event_name: 'Lead',
          event_time: 1000002,
          match_keys: {
            email: ['hashed-email-3'],
          },
        },
      ],
    });
    const output = require('fs').getContentForPath('path/to/preprocessed.csv');
    const expectedOutput =
`match_keys.email,match_keys.email,match_keys.email,match_keys.phone,match_keys.phone,event_name,event_time
hashed-email-1,,,hashed-phone-1a,hashed-phone-1b,Lead,1000000
hashed-email-2a,hashed-email-2b,hashed-email-2c,hashed-phone-2,,Lead,1000001
hashed-email-3,,,,,Lead,1000002
`;
    expect(output).toBe(expectedOutput);
  });

  it('should output preset values properly', async () => {
    const {sender} = getPseudoBatchSenderForPreprocessing(
      'path/to/preprocessed.csv',
      {
        '0': 'match_keys.email',
        '1': 'event_time',
        '2': 'value',
      },
      {},
      {
        event_name: 'Purchase',
        currency: 'USD',
      },
    );
    await sender({
      start: 0,
      end: 30,
      rows: [
        {
          event_name: 'Purchase',
          currency: 'USD',
          value: 1.23,
          event_time: 1000000,
          match_keys: {
            email: 'hashed-email-1',
          },
        },
        {
          event_name: 'Purchase',
          currency: 'USD',
          value: 4.56,
          event_time: 1000001,
          match_keys: {
            email: 'hashed-email-2',
          },
        },
      ],
    });
    const output = require('fs').getContentForPath('path/to/preprocessed.csv');
    const expectedOutput =
`match_keys.email,event_time,value,event_name,currency
hashed-email-1,1000000,1.23,Purchase,USD
hashed-email-2,1000001,4.56,Purchase,USD
`;
    expect(output).toBe(expectedOutput);
  });

  it('should output content_ids properly', async () => {
    const {sender} = getPseudoBatchSenderForPreprocessing(
      'path/to/preprocessed.csv',
      {
        '0': 'match_keys.email',
        '1': 'event_name',
        '2': 'event_time',
        '3': 'content_type',
        '4': 'content_ids',
      },
      {},
      {},
    );
    await sender({
      start: 0,
      end: 30,
      rows: [
        {
          event_name: 'Lead',
          event_time: 1000000,
          match_keys: {
            email: 'hashed-email-1',
          },
          content_type: 'product',
          content_ids: ['x', 'y', 'z'],
        },
        {
          event_name: 'Lead',
          event_time: 1000001,
          match_keys: {
            email: 'hashed-email-2',
          },
          content_type: 'product',
          content_ids: ['a'],
        },
        {
          event_name: 'Lead',
          event_time: 1000002,
          match_keys: {
            email: 'hashed-email-3',
          },
          content_type: 'product',
          content_ids: [],
        },
      ],
    });
    const output = require('fs').getContentForPath('path/to/preprocessed.csv');
    const expectedOutput =
`match_keys.email,event_name,event_time,content_type,content_ids
hashed-email-1,Lead,1000000,product,"x,y,z"
hashed-email-2,Lead,1000001,product,a
hashed-email-3,Lead,1000002,product,
`;
    expect(output).toBe(expectedOutput);
  });

  it('should output catalog_auto_population_info properly', async () => {
    const {sender} = getPseudoBatchSenderForPreprocessing(
      'path/to/preprocessed.csv',
      {
        '0': 'match_keys.email',
        '1': 'event_name',
        '2': 'event_time',
        '3': 'catalog_auto_population_info',
      },
      {},
      {},
    );
    const sample_auto_population_item_1 = {
      availability: 'in stock',
      brand: 'Sample Brand',
      category: 'Clothing & Accessories > Clothing > Dresses',
      currency: 'USD',
      condition: 'new',
      description: 'A Sample Catalog Auto Population Item',
      image_url: 'https://www.facebook.com/sample_csv_item.jpg',
      name: 'Sample Catalog Auto Population Item',
      price: 199,
      product_type: 'Clothing & Accessories > Clothing > Dresses',
      retailer_id: 'sample_retailer_id_1',
      url: 'https://www.facebook.com/sample_csv_item',
      visibility: 'published',
    };
    const sample_auto_population_item_2 = {
      availability: 'in stock',
      brand: 'Sample Brand',
      category: 'Clothing & Accessories > Clothing > Dresses',
      currency: 'USD',
      condition: 'new',
      description: 'A Sample Catalog Auto Population Item',
      image_url: 'https://www.facebook.com/sample_csv_item.jpg',
      name: 'Sample Catalog Auto Population Item',
      price: 199,
      product_type: 'Clothing & Accessories > Clothing > Dresses',
      retailer_id: 'sample_retailer_id_2',
      url: 'https://www.facebook.com/sample_csv_item',
      visibility: 'published',
    };
    await sender({
      start: 0,
      end: 30,
      rows: [
        {
          event_name: 'Lead',
          event_time: 1000000,
          match_keys: {
            email: 'hashed-email-1',
          },
          catalog_auto_population_info: JSON.stringify([]),
        },
        {
          event_name: 'Lead',
          event_time: 1000001,
          match_keys: {
            email: 'hashed-email-2',
          },
          catalog_auto_population_info: JSON.stringify([
            sample_auto_population_item_1,
          ]),
        },
        {
          event_name: 'Lead',
          event_time: 1000002,
          match_keys: {
            email: 'hashed-email-3',
          },
          catalog_auto_population_info: JSON.stringify([
            sample_auto_population_item_1,
            sample_auto_population_item_2,
          ]),
        },
      ],
    });
    const output = require('fs').getContentForPath('path/to/preprocessed.csv');
    const expectedOutput =
`match_keys.email,event_name,event_time,catalog_auto_population_info
hashed-email-1,Lead,1000000,\"\"\"[]\"\"\"
hashed-email-2,Lead,1000001,\"\"\"${JSON.stringify([
  sample_auto_population_item_1,
]).replace(/\"/g, '\\\"\"')}\"\"\"
hashed-email-3,Lead,1000002,\"\"\"${JSON.stringify([
  sample_auto_population_item_1,
  sample_auto_population_item_2,
]).replace(/\"/g, '\\\"\"')}\"\"\"
`;
    expect(output).toBe(expectedOutput);
  });
});
