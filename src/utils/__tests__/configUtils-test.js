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

const configUtils = require('../configUtils');

const {
  checkConfigForRawEventData,
  checkAndDeriveConfigForPreprocessedEventData,
} = configUtils;

const NOW = new Date();
const NOW_ISO_STR = (new Date()).toISOString();
const NOW_UNIX_STR = String(Math.floor(NOW.getTime() / 1000));

describe('checkConfigForRawEventData', () => {
  it('pass with minimum input', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['test1@fb.com', 'test2@fb.com'],
        ['Lead', 'Lead'],
        [NOW_ISO_STR, NOW_ISO_STR],
      ],
      false,
      {
        '0': 'match_keys.email',
        '1': 'event_name',
        '2': 'event_time',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        },
      },
      {},
      {},
    )).not.toThrow();
  });

  it('pass with full mapping', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['test1@fb.com', 'test2@fb.com'],
        ['test3@fb.com', 'test4@fb.com'],
        ['test5@fb.com', 'test6@fb.com'],
        ['14120000001', '14120000002'],
        ['14120000003', '14120000004'],
        ['14120000005', '14120000006'],
        [
          'AECE52E7-03EE-455A-B3C4-E57283966239',
          'BEBE52E7-03EE-455A-B3C4-E57283966239',
        ],
        ['John', 'F.'],
        ['Doe', 'Smith'],
        ['95112', '94040'],
        ['San Jose', 'Mountain View'],
        ['CA', 'CA'],
        ['US', 'US'],
        ['1992/05/25', '1992/05/26'],
        ['m', 'f'],
        ['25', '25'],
        ['l:123456789', 'l:987654321'],
        ['23333333333', '66666666666'],
        ['Purchase', 'Lead'],
        [NOW_ISO_STR, NOW_ISO_STR],
        ['2.50', '4.56'],
        ['USD', 'USD'],
        ['ABC123', '123DEF'],
        ['1', 'A2'],
        ['SKU1;SKU2', 'SKU3'],
        ['1.00;1.50', '4.56'],
        ['1;1', '1'],
        ['BrandA;BrandB', 'BrandC'],
        ['Clothing & Accessories > Clothing > Dresses;Clothing & Accessories > Clothing > Dresses', 'Apparel & Accessories > Shoes'],
        ['Best Shirt Ever;Best Pants Ever', 'Best Shoes Ever'],
        ['AlphaShirt, a shirt like no other;Betapants, pants like no other', 'Gammashoe, a shoe like no other'],
        ['physical_store', 'phone_call'],
        ['[]', '[LDU]'],
        ['1', '1'],
        ['1000', '1000'],
      ],
      false,
      {
        '0': 'match_keys.email',
        '1': 'match_keys.email',
        '2': 'match_keys.email',
        '3': 'match_keys.phone',
        '4': 'match_keys.phone',
        '5': 'match_keys.phone',
        '6': 'match_keys.madid',
        '7': 'match_keys.fn',
        '8': 'match_keys.ln',
        '9': 'match_keys.zip',
        '10': 'match_keys.ct',
        '11': 'match_keys.st',
        '12': 'match_keys.country',
        '13': 'match_keys.dob',
        '14': 'match_keys.gen',
        '15': 'match_keys.age',
        '16': 'match_keys.lead_id',
        '17': 'match_keys.extern_id',
        '18': 'event_name',
        '19': 'event_time',
        '20': 'value',
        '21': 'currency',
        '22': 'order_id',
        '23': 'item_number',
        '24': 'contents.content_id',
        '25': 'contents.price',
        '26': 'contents.quantity',
        '27': 'contents.brand',
        '28': 'contents.category',
        '29': 'contents.description',
        '30': 'contents.title',
        '31': 'action_source',
        '32': 'data_processing_options',
        '33': 'data_processing_options_country',
        '34': 'data_processing_options_state'
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        },
        dob: 'YYYY/MM/DD',
      },
      {},
      {},
    )).not.toThrow();
  });

  it('pass with custom data field', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['test1@fb.com', 'test2@fb.com'],
        ['Lead', 'Lead'],
        [NOW_ISO_STR, NOW_ISO_STR],
        ['Food1', 'Food2'],
        ['123', '456'],
      ],
      false,
      {
        '0': 'match_keys.email',
        '1': 'event_name',
        '2': 'event_time',
        '3': 'custom_data.food',
        '4': 'custom_data.calories',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        },
      },
      {
        food: {baseType: 'text'},
        calories: {baseType: 'number'},
      },
      {},
    )).not.toThrow();
  });

  it('pass with presetValues', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['test1@fb.com', 'test2@fb.com'],
        [NOW_ISO_STR, NOW_ISO_STR],
        ['1.23', '4.56'],
      ],
      false,
      {
        '0': 'match_keys.email',
        '1': 'event_time',
        '2': 'value',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        },
      },
      {},
      {
        event_name: 'Purchase',
        currency: 'USD',
      },
    )).not.toThrow();
  });

  it('pass with header', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['email', 'test1@fb.com', 'test2@fb.com'],
        ['Purchase', 'Lead', 'Lead'],
        ['event_time', NOW_ISO_STR, NOW_ISO_STR],
      ],
      true,
      {
        '0': 'match_keys.email',
        '1': 'event_name',
        '2': 'event_time',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        },
      },
      {},
      {},
    )).not.toThrow();
  });

  it('fail due to mapping index not a number', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['test1@fb.com', 'test2@fb.com'],
        ['Lead', 'Lead'],
        [NOW_ISO_STR, NOW_ISO_STR],
      ],
      false,
      {
        '0': 'match_keys.email',
        '1': 'event_name',
        '2': 'event_time',
        'phone': 'match_keys.phone',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        },
      },
      {},
      {},
    )).toThrow();
  });

  it('fail due to mapping index out of range', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['test1@fb.com', 'test2@fb.com'],
        ['Lead', 'Lead'],
        [NOW_ISO_STR, NOW_ISO_STR],
      ],
      false,
      {
        '0': 'match_keys.email',
        '1': 'event_name',
        '2': 'event_time',
        '3': 'match_keys.phone',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        },
      },
      {},
      {},
    )).toThrow();
  });

  it('fail due to mapping index not an integer', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['test1@fb.com', 'test2@fb.com'],
        ['Lead', 'Lead'],
        [NOW_ISO_STR, NOW_ISO_STR],
      ],
      false,
      {
        '0': 'match_keys.email',
        '1': 'event_name',
        '1.5': 'match_keys.phone',
        '2': 'event_time',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        },
      },
      {},
      {},
    )).toThrow();
  });

  it('fail due to unknown mapping', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['test1@fb.com', 'test2@fb.com'],
        ['14129440000', '14129440001'],
        ['Lead', 'Lead'],
        [NOW_ISO_STR, NOW_ISO_STR],
      ],
      false,
      {
        '0': 'match_keys.email',
        '1': 'match_keys.mobile_phone', // should be 'match_keys.phone'
        '2': 'event_name',
        '3': 'event_time',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        },
      },
      {},
      {},
    )).toThrow();
  });

  it('fail due to too many mapping', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['test1@fb.com', 'test2@fb.com'],
        ['test3@fb.com', 'test4@fb.com'],
        ['test5@fb.com', 'test6@fb.com'],
        ['test7@fb.com', 'test8@fb.com'],
        ['Lead', 'Lead'],
        [NOW_ISO_STR, NOW_ISO_STR],
      ],
      false,
      {
        '0': 'match_keys.email',
        '1': 'match_keys.email',
        '2': 'match_keys.email',
        '3': 'match_keys.email', // Too many emails!
        '4': 'event_name',
        '5': 'event_time',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        },
      },
      {},
      {},
    )).toThrow();

    expect(() => checkConfigForRawEventData(
      [
        ['test1@fb.com', 'test2@fb.com'],
        ['Lead', 'Lead'],
        [NOW_ISO_STR, NOW_ISO_STR],
        [NOW_ISO_STR, NOW_ISO_STR],
      ],
      false,
      {
        '0': 'match_keys.email',
        '1': 'event_name',
        '2': 'event_time',
        '3': 'event_time', // Too many event time!
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        },
      },
      {},
      {},
    )).toThrow();
  });

  it('fail due to same custom data name', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['test1@fb.com', 'test2@fb.com'],
        ['Lead', 'Lead'],
        [NOW_ISO_STR, NOW_ISO_STR],
        ['Food1', 'Food2'],
        ['Food3', 'Food4'],
      ],
      false,
      {
        '0': 'match_keys.email',
        '1': 'event_name',
        '2': 'event_time',
        '3': 'custom_data.food',
        '4': 'custom_data.food',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        },
      },
      {},
      {},
    )).toThrow();
  });

  it('fail due to empty custom data name', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['test1@fb.com', 'test2@fb.com'],
        ['Lead', 'Lead'],
        [NOW_ISO_STR, NOW_ISO_STR],
        ['Food1', 'Food2'],
      ],
      false,
      {
        '0': 'match_keys.email',
        '1': 'event_name',
        '2': 'event_time',
        '3': 'custom_data',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        },
      },
      {},
      {},
    )).toThrow();

    expect(() => checkConfigForRawEventData(
      [
        ['test1@fb.com', 'test2@fb.com'],
        ['Lead', 'Lead'],
        [NOW_ISO_STR, NOW_ISO_STR],
        ['Food1', 'Food2'],
      ],
      false,
      {
        '0': 'match_keys.email',
        '1': 'event_name',
        '2': 'event_time',
        '3': 'custom_data.',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        },
      },
      {},
      {},
    )).toThrow();
  });

  it('fail due to invalid custom data name', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['test1@fb.com', 'test2@fb.com'],
        ['Lead', 'Lead'],
        [NOW_ISO_STR, NOW_ISO_STR],
        ['Food1', 'Food2'],
      ],
      false,
      {
        '0': 'match_keys.email',
        '1': 'event_name',
        '2': 'event_time',
        '3': 'custom_data.should.not.have.more.than.one.dot',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        },
      },
      {},
      {},
    )).toThrow();
  });

  it('fail due to missing event_time', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['test1@fb.com', 'test2@fb.com'],
        ['Lead', 'Lead'],
      ],
      false,
      {
        '0': 'match_keys.email',
        '1': 'event_name',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        },
      },
      {},
      {},
    )).toThrow();
  });

  it('fail due to missing event_name', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['test1@fb.com', 'test2@fb.com'],
        ['Lead', 'Lead'],
        [NOW_ISO_STR, NOW_ISO_STR],
      ],
      false,
      {
        '0': 'match_keys.email',
        '2': 'event_time',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        },
      },
      {},
      {},
    )).toThrow();
  });

  it('fail due to missing value and currency, when preset event name is purchase', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['test1@fb.com', 'test2@fb.com'],
        [NOW_ISO_STR, NOW_ISO_STR],
      ],
      false,
      {
        '0': 'match_keys.email',
        '1': 'event_time',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        },
      },
      {},
      {
        event_name: 'Purchase',
      },
    )).toThrow();
  });

  it('pass if missing value and currency, but preset event name is not purchase', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['test1@fb.com', 'test2@fb.com'],
        [NOW_ISO_STR, NOW_ISO_STR],
      ],
      false,
      {
        '0': 'match_keys.email',
        '1': 'event_time',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        },
      },
      {},
      {
        event_name: 'Lead',
      },
    )).not.toThrow();
  });

  it('fail due to missing value and currency, when sample event name has purchase', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['test1@fb.com', 'test2@fb.com'],
        ['Lead', 'Purchase'],
        [NOW_ISO_STR, NOW_ISO_STR],
      ],
      false,
      {
        '0': 'match_keys.email',
        '1': 'event_name',
        '2': 'event_time',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        },
      },
      {},
      {},
    )).toThrow();
  });

  it('fail due to missing value when currency is mapped', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['test1@fb.com', 'test2@fb.com'],
        ['Lead', 'Lead'],
        [NOW_ISO_STR, NOW_ISO_STR],
        ['USD', 'USD']
      ],
      false,
      {
        '0': 'match_keys.email',
        '1': 'event_name',
        '2': 'event_time',
        '3': 'currency',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        },
      },
      {},
      {},
    )).toThrow();
  });

  it('fail due to missing value when currency is preset', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['test1@fb.com', 'test2@fb.com'],
        ['Lead', 'Lead'],
        [NOW_ISO_STR, NOW_ISO_STR],
      ],
      false,
      {
        '0': 'match_keys.email',
        '1': 'event_name',
        '2': 'event_time',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        },
      },
      {},
      {
        currency: 'USD',
      },
    )).toThrow();
  });

  it('fail due to missing currency if value is mapped', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['test1@fb.com', 'test2@fb.com'],
        ['Lead', 'Purchase'],
        [NOW_ISO_STR, NOW_ISO_STR],
        ['1.23', '4.56'],
      ],
      false,
      {
        '0': 'match_keys.email',
        '1': 'event_name',
        '2': 'event_time',
        '3': 'value',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        },
      },
      {},
      {},
    )).toThrow();
  });

  it('fail due to missing content_ids if content_type is mapped', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['test1@fb.com', 'test2@fb.com'],
        ['Lead', 'Lead'],
        [NOW_ISO_STR, NOW_ISO_STR],
        ['product', 'destination'],
      ],
      false,
      {
        '0': 'match_keys.email',
        '1': 'event_name',
        '2': 'event_time',
        '3': 'content_type',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        },
      },
      {},
      {},
    )).toThrow();
  });

  it('fail due to missing content_type if content_ids is mapped', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['test1@fb.com', 'test2@fb.com'],
        ['Lead', 'Lead'],
        [NOW_ISO_STR, NOW_ISO_STR],
        ['1', '2,A3'],
      ],
      false,
      {
        '0': 'match_keys.email',
        '1': 'event_name',
        '2': 'event_time',
        '3': 'content_ids',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        },
      },
      {},
      {},
    )).toThrow();
  });

  it('fail if preset value contains irrelevant field', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['test1@fb.com', 'test2@fb.com'],
        ['Lead', 'Lead'],
        [NOW_ISO_STR, NOW_ISO_STR],
      ],
      false,
      {
        '0': 'match_keys.email',
        '1': 'event_name',
        '2': 'event_time',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        },
      },
      {},
      {
        hello: 'world',
      },
    )).toThrow();
  });

  it('fail if event_name is both mapped and preset', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['test1@fb.com', 'test2@fb.com'],
        ['Lead', 'Lead'],
        [NOW_ISO_STR, NOW_ISO_STR],
      ],
      false,
      {
        '0': 'match_keys.email',
        '1': 'event_name',
        '2': 'event_time',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        },
      },
      {},
      {
        event_name: 'Lead',
      },
    )).toThrow();
  });

  it('fail if event_name is preset to invalid value', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['test1@fb.com', 'test2@fb.com'],
        [NOW_ISO_STR, NOW_ISO_STR],
      ],
      false,
      {
        '0': 'match_keys.email',
        '1': 'event_time',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        },
      },
      {},
      {
        event_name: 'BlowUpTheRestroom',
      },
    )).toThrow();
  });

  it('fail if currency is both mapped and preset', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['test1@fb.com', 'test2@fb.com'],
        ['Lead', 'Lead'],
        [NOW_ISO_STR, NOW_ISO_STR],
        ['1.23', '4.56'],
        ['USD', 'USD'],
      ],
      false,
      {
        '0': 'match_keys.email',
        '1': 'event_name',
        '2': 'event_time',
        '3': 'value',
        '4': 'currency',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        },
      },
      {},
      {
        currency: 'USD',
      },
    )).toThrow();
  });

  it('fail if currency is preset to invalid value', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['test1@fb.com', 'test2@fb.com'],
        ['Lead', 'Lead'],
        [NOW_ISO_STR, NOW_ISO_STR],
        ['1.23', '4.56'],
      ],
      false,
      {
        '0': 'match_keys.email',
        '1': 'event_name',
        '2': 'event_time',
        '3': 'value',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        },
      },
      {},
      {
        currency: 'DogeCoin',
      },
    )).toThrow();
  });

  it('fail if customTypeInfo is not set', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['test1@fb.com', 'test2@fb.com'],
        ['Lead', 'Lead'],
        [NOW_ISO_STR, NOW_ISO_STR],
        ['Food1', 'Food2'],
      ],
      false,
      {
        '0': 'match_keys.email',
        '1': 'event_name',
        '2': 'event_time',
        '3': 'custom_data.food',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        },
      },
      {},
      {},
    )).toThrow();
  });

  it('fail if customTypeInfo is set to wrong format', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['test1@fb.com', 'test2@fb.com'],
        ['Lead', 'Lead'],
        [NOW_ISO_STR, NOW_ISO_STR],
        ['Food1', 'Food2'],
      ],
      false,
      {
        '0': 'match_keys.email',
        '1': 'event_name',
        '2': 'event_time',
        '3': 'custom_data.food',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        },
      },
      {
        food: 'text',
      },
      {},
    )).toThrow();
  });

  it('fail if customTypeInfo is set to wrong baseType', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['test1@fb.com', 'test2@fb.com'],
        ['Lead', 'Lead'],
        [NOW_ISO_STR, NOW_ISO_STR],
        ['Food1', 'Food2'],
      ],
      false,
      {
        '0': 'match_keys.email',
        '1': 'event_name',
        '2': 'event_time',
        '3': 'custom_data.food',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        },
      },
      {
        food: {
          baseType: 'string',
        },
      },
      {},
    )).toThrow();
  });

  it('fail if customTypeInfo contains irrelevant field', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['test1@fb.com', 'test2@fb.com'],
        ['Lead', 'Lead'],
        [NOW_ISO_STR, NOW_ISO_STR],
      ],
      false,
      {
        '0': 'match_keys.email',
        '1': 'event_name',
        '2': 'event_time',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        },
      },
      {
        irrelevant: {
          baseType: 'text',
        },
      },
      {},
    )).toThrow();
  });

  it('fail if infoForNormalization.event_time is missing', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['test1@fb.com', 'test2@fb.com'],
        ['Lead', 'Lead'],
        [NOW_ISO_STR, NOW_ISO_STR],
      ],
      false,
      {
        '0': 'match_keys.email',
        '1': 'event_name',
        '2': 'event_time',
      },
      {},
      {},
      {},
    )).toThrow();
  });

  it('fail if infoForNormalization.event_time.timeFormat is invalid', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['test1@fb.com', 'test2@fb.com'],
        ['Lead', 'Lead'],
        [NOW_ISO_STR, NOW_ISO_STR],
      ],
      false,
      {
        '0': 'match_keys.email',
        '1': 'event_name',
        '2': 'event_time',
      },
      {
        event_time: {
          timeFormat: 'unsupported-time-format',
        },
      },
      {},
      {},
    )).toThrow();
  });

  it('fail if infoForNormalization.event_time.timeZone is not a number', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['test1@fb.com', 'test2@fb.com'],
        ['Lead', 'Lead'],
        [NOW_ISO_STR, NOW_ISO_STR],
      ],
      false,
      {
        '0': 'match_keys.email',
        '1': 'event_name',
        '2': 'event_time',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
          timeZone: 'UTC',
        },
      },
      {},
      {},
    )).toThrow();
  });

  it('fail if infoForNormalization.event_time.timeZone is out of range', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['test1@fb.com', 'test2@fb.com'],
        ['Lead', 'Lead'],
        [NOW_ISO_STR, NOW_ISO_STR],
      ],
      false,
      {
        '0': 'match_keys.email',
        '1': 'event_name',
        '2': 'event_time',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
          timeZone: NaN,
        },
      },
      {},
      {},
    )).toThrow();

    expect(() => checkConfigForRawEventData(
      [
        ['test1@fb.com', 'test2@fb.com'],
        ['Lead', 'Lead'],
        [NOW_ISO_STR, NOW_ISO_STR],
      ],
      false,
      {
        '0': 'match_keys.email',
        '1': 'event_name',
        '2': 'event_time',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
          timeZone: 24,
        },
      },
      {},
      {},
    )).toThrow();
  });

  it('fail if infoForNormalization.dob is missing when dob is mapped', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['test1@fb.com', 'test2@fb.com'],
        ['Lead', 'Lead'],
        [NOW_ISO_STR, NOW_ISO_STR],
        ['1992/05/25', '1992/05/26'],
      ],
      false,
      {
        '0': 'match_keys.email',
        '1': 'event_name',
        '2': 'event_time',
        '3': 'match_keys.dob',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        },
      },
      {},
      {},
    )).toThrow();
  });

  it('fail if infoForNormalization.dob is invalid', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['test1@fb.com', 'test2@fb.com'],
        ['Lead', 'Lead'],
        [NOW_ISO_STR, NOW_ISO_STR],
        ['1992/05/25', '1992/05/26'],
      ],
      false,
      {
        '0': 'match_keys.email',
        '1': 'event_name',
        '2': 'event_time',
        '3': 'match_keys.dob',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        },
        // Should be dob: 'YYYY/MM/DD' instead.
        dob: {
          timeFormat: 'YYYY/MM/DD',
        },
      },
      {},
      {},
    )).toThrow();
  });

  it('fail if Country invalid for LDU event', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['LDU'],
        ['0'],
        ['1000'],
        [NOW_ISO_STR],
      ],
      false,
      {
        '0': 'data_processing_options',
        '1': 'data_processing_options_country',
        '2': 'data_processing_options_state',
        '3': 'event_time',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        }
      },
      {},
      {},
    )).toThrow();
  });

  it('fail if Country missing for LDU event', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['LDU'],
        ['1000'],
        [NOW_ISO_STR],
      ],
      false,
      {
        '0': 'data_processing_options',
        '1': 'data_processing_options_state',
        '2': 'event_time',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        }
      },
      {},
      {},
    )).toThrow();
  });

    it('fail if State invalid for LDU event', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['LDU'],
        ['1'],
        ['0'],
        [NOW_ISO_STR],
      ],
      false,
      {
        '0': 'data_processing_options',
        '1': 'data_processing_options_country',
        '2': 'data_processing_options_state',
        '3': 'event_time',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        }
      },
      {},
      {},
    )).toThrow();
  });

  it('fail if State missing for LDU event', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['LDU'],
        ['1'],
        [NOW_ISO_STR],
      ],
      false,
      {
        '0': 'data_processing_options',
        '1': 'data_processing_options_country',
        '2': 'event_time',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        }
      },
      {},
      {},
    )).toThrow();
  });
});

describe('checkAndDeriveConfigForPreprocessedEventData', () => {
  it('pass with minimum input', () => {
    expect(checkAndDeriveConfigForPreprocessedEventData([
      ['match_keys.email', '<HASH>', '<HASH>'],
      ['event_name', 'Lead', 'Lead'],
      ['event_time', NOW_UNIX_STR, NOW_UNIX_STR],
    ])).toEqual({
      mapping: {
        '0': 'match_keys.email',
        '1': 'event_name',
        '2': 'event_time',
      },
      customTypeInfo: {},
    });
  });

  it('pass with full mapping', () => {
    expect(checkAndDeriveConfigForPreprocessedEventData([
      ['match_keys.email', '<HASH>', '<HASH>'],
      ['match_keys.email', '<HASH>', '<HASH>'],
      ['match_keys.email', '<HASH>', '<HASH>'],
      ['match_keys.phone', '<HASH>', '<HASH>'],
      ['match_keys.phone', '<HASH>', '<HASH>'],
      ['match_keys.phone', '<HASH>', '<HASH>'],
      ['match_keys.madid', '<HASH>', '<HASH>'],
      ['match_keys.fn', '<HASH>', '<HASH>'],
      ['match_keys.fi', '<HASH>', '<HASH>'],
      ['match_keys.f5first', '<HASH>', '<HASH>'],
      ['match_keys.ln', '<HASH>', '<HASH>'],
      ['match_keys.f5last', '<HASH>', '<HASH>'],
      ['match_keys.zip', '<HASH>', '<HASH>'],
      ['match_keys.ct', '<HASH>', '<HASH>'],
      ['match_keys.st', '<HASH>', '<HASH>'],
      ['match_keys.country', '<HASH>', '<HASH>'],
      ['match_keys.doby', '<HASH>', '<HASH>'],
      ['match_keys.dobm', '<HASH>', '<HASH>'],
      ['match_keys.dobd', '<HASH>', '<HASH>'],
      ['match_keys.gen', '<HASH>', '<HASH>'],
      ['match_keys.lead_id', '123456789', '987654321'],
      ['match_keys.extern_id', '23333333333', '66666666666'],
      ['event_name', 'Purchase', 'Lead'],
      ['event_time', NOW_UNIX_STR, NOW_UNIX_STR],
      ['value', '1.23', '4.56'],
      ['currency', 'USD', 'USD'],
      ['order_id', 'ABC123', '123DEF'],
      ['item_number', '1', 'A2'],
      ['contents.content_id', 'SKU1;SKU2', 'SKU3'],
      ['contents.price', '1.00;1.50', '4.56'],
      ['contents.quantity', '1;1', '1'],
      ['contents.brand', 'BrandA;BrandB', 'BrandC'],
      ['contents.category', 'Clothing & Accessories > Clothing > Dresses;Clothing & Accessories > Clothing > Dresses', 'Apparel & Accessories > Shoes'],
      ['contents.description', 'Best Shirt Ever;Best Pants Ever', 'Best Shoes Ever'],
      ['contents.title', 'AlphaShirt, a shirt like no other;Betapants, pants like no other', 'Gammashoe, a shoe like no other'],
      ['action_source', 'physical_store', 'phone_call'],
      ['data_processing_options', '[]', '[LDU]'],
      ['data_processing_options_country', '1', '1'],
      ['data_processing_options_state', '1000', '1000'],
    ])).toEqual({
      mapping: {
        '0': 'match_keys.email',
        '1': 'match_keys.email',
        '2': 'match_keys.email',
        '3': 'match_keys.phone',
        '4': 'match_keys.phone',
        '5': 'match_keys.phone',
        '6': 'match_keys.madid',
        '7': 'match_keys.fn',
        '8': 'match_keys.fi',
        '9': 'match_keys.f5first',
        '10': 'match_keys.ln',
        '11': 'match_keys.f5last',
        '12': 'match_keys.zip',
        '13': 'match_keys.ct',
        '14': 'match_keys.st',
        '15': 'match_keys.country',
        '16': 'match_keys.doby',
        '17': 'match_keys.dobm',
        '18': 'match_keys.dobd',
        '19': 'match_keys.gen',
        '20': 'match_keys.lead_id',
        '21': 'match_keys.extern_id',
        '22': 'event_name',
        '23': 'event_time',
        '24': 'value',
        '25': 'currency',
        '26': 'order_id',
        '27': 'item_number',
        '28': 'contents.content_id',
        '29': 'contents.price',
        '30': 'contents.quantity',
        '31': 'contents.brand',
        '32': 'contents.category',
        '33': 'contents.description',
        '34': 'contents.title',
        '35': 'action_source',
        '36': 'data_processing_options',
        '37': 'data_processing_options_country',
        '38': 'data_processing_options_state'
      },
      customTypeInfo: {},
    });
  });

  it('pass with custom data field', () => {
    expect(checkAndDeriveConfigForPreprocessedEventData([
      ['match_keys.email', '<HASH>', '<HASH>'],
      ['event_name', 'Lead', 'Lead'],
      ['event_time', NOW_UNIX_STR, NOW_UNIX_STR],
      ['custom_data.food:text', 'Food1', 'Food2'],
      ['custom_data.calories:number', '123', '456'],
    ])).toEqual({
      mapping: {
        '0': 'match_keys.email',
        '1': 'event_name',
        '2': 'event_time',
        '3': 'custom_data.food',
        '4': 'custom_data.calories',
      },
      customTypeInfo: {
        food: {baseType: 'text'},
        calories: {baseType: 'number'},
      },
    });
  });

  it('fail due to unknown mapping', () => {
    expect(() => checkAndDeriveConfigForPreprocessedEventData([
      ['match_keys.email', '<HASH>', '<HASH>'],
      ['event_name', 'Lead', 'Lead'],
      ['event_time', NOW_UNIX_STR, NOW_UNIX_STR],
      ['unknown_mapping', 'Food1', 'Food2'],
    ])).toThrow();
  });

  it('fail due to too many mapping', () => {
    expect(() => checkAndDeriveConfigForPreprocessedEventData([
      ['match_keys.email', '<HASH>', '<HASH>'],
      ['match_keys.email', '<HASH>', '<HASH>'],
      ['match_keys.email', '<HASH>', '<HASH>'],
      ['match_keys.email', '<HASH>', '<HASH>'],
      ['event_name', 'Lead', 'Lead'],
      ['event_time', NOW_UNIX_STR, NOW_UNIX_STR],
    ])).toThrow();

    expect(() => checkAndDeriveConfigForPreprocessedEventData([
      ['match_keys.email', '<HASH>', '<HASH>'],
      ['event_name', 'Lead', 'Lead'],
      ['event_time', NOW_UNIX_STR, NOW_UNIX_STR],
      ['event_time', NOW_UNIX_STR, NOW_UNIX_STR],
    ])).toThrow();
  });

  it('fail due to same custom data name', () => {
    expect(() => checkAndDeriveConfigForPreprocessedEventData([
      ['match_keys.email', '<HASH>', '<HASH>'],
      ['event_name', 'Lead', 'Lead'],
      ['event_time', NOW_UNIX_STR, NOW_UNIX_STR],
      ['custom_data.food:text', 'Food1', 'Food2'],
      ['custom_data.food:text', 'Food3', 'Food4'],
    ])).toThrow();
  });

  it('fail due to empty custom data name', () => {
    expect(() => checkAndDeriveConfigForPreprocessedEventData([
      ['match_keys.email', '<HASH>', '<HASH>'],
      ['event_name', 'Lead', 'Lead'],
      ['event_time', NOW_UNIX_STR, NOW_UNIX_STR],
      ['custom_data:text', 'Food1', 'Food2'],
    ])).toThrow();

    expect(() => checkAndDeriveConfigForPreprocessedEventData([
      ['match_keys.email', '<HASH>', '<HASH>'],
      ['event_name', 'Lead', 'Lead'],
      ['event_time', NOW_UNIX_STR, NOW_UNIX_STR],
      ['custom_data.:text', 'Food1', 'Food2'],
    ])).toThrow();
  });

  it('fail due to invalid custom data name', () => {
    expect(() => checkAndDeriveConfigForPreprocessedEventData([
      ['match_keys.email', '<HASH>', '<HASH>'],
      ['event_name', 'Lead', 'Lead'],
      ['event_time', NOW_UNIX_STR, NOW_UNIX_STR],
      ['custom_data.no.more.than.one.dot:text', 'Food1', 'Food2'],
    ])).toThrow();
  });

  it('fail due to invalid custom data type', () => {
    expect(() => checkAndDeriveConfigForPreprocessedEventData([
      ['match_keys.email', '<HASH>', '<HASH>'],
      ['event_name', 'Lead', 'Lead'],
      ['event_time', NOW_UNIX_STR, NOW_UNIX_STR],
      ['custom_data.food:string', 'Food1', 'Food2'],
    ])).toThrow();

    expect(() => checkAndDeriveConfigForPreprocessedEventData([
      ['match_keys.email', '<HASH>', '<HASH>'],
      ['event_name', 'Lead', 'Lead'],
      ['event_time', NOW_UNIX_STR, NOW_UNIX_STR],
      ['custom_data.food', 'Food1', 'Food2'],
    ])).toThrow();
  });

  it('fail due to missing value and currency, when sample event name has purchase', () => {
    expect(() => checkAndDeriveConfigForPreprocessedEventData([
      ['match_keys.email', '<HASH>', '<HASH>'],
      ['event_name', 'Lead', 'Purchase'],
      ['event_time', NOW_UNIX_STR, NOW_UNIX_STR],
    ])).toThrow();
  });

  it('fail due to missing value when currency is mapped', () => {
    expect(() => checkAndDeriveConfigForPreprocessedEventData([
      ['match_keys.email', '<HASH>', '<HASH>'],
      ['event_name', 'Lead', 'Lead'],
      ['event_time', NOW_UNIX_STR, NOW_UNIX_STR],
      ['currency', 'USD', 'USD'],
    ])).toThrow();
  });

  it('fail due to missing currency if value is mapped', () => {
    expect(() => checkAndDeriveConfigForPreprocessedEventData([
      ['match_keys.email', '<HASH>', '<HASH>'],
      ['event_name', 'Lead', 'Lead'],
      ['event_time', NOW_UNIX_STR, NOW_UNIX_STR],
      ['value', '1.23', '4.56'],
    ])).toThrow();
  });

  it('fail due to missing content_ids if content_type is mapped', () => {
    expect(() => checkAndDeriveConfigForPreprocessedEventData([
      ['match_keys.email', '<HASH>', '<HASH>'],
      ['event_name', 'Lead', 'Lead'],
      ['event_time', NOW_UNIX_STR, NOW_UNIX_STR],
      ['content_type', 'product', 'destination'],
    ])).toThrow();
  });

  it('fail due to missing content_type if content_ids is mapped', () => {
    expect(() => checkAndDeriveConfigForPreprocessedEventData([
      ['match_keys.email', '<HASH>', '<HASH>'],
      ['event_name', 'Lead', 'Lead'],
      ['event_time', NOW_UNIX_STR, NOW_UNIX_STR],
      ['content_ids', '1', '2,A3'],
    ])).toThrow();
  });

  it('fail if Country invalid for LDU event', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['LDU'],
        ['0'],
        ['1000'],
        [NOW_ISO_STR],
      ],
      false,
      {
        '0': 'data_processing_options',
        '1': 'data_processing_options_country',
        '2': 'data_processing_options_state',
        '3': 'event_time',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        }
      },
      {},
      {},
    )).toThrow();
  });

  it('fail if Country missing for LDU event', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['LDU'],
        ['1000'],
        [NOW_ISO_STR],
      ],
      false,
      {
        '0': 'data_processing_options',
        '1': 'data_processing_options_state',
        '2': 'event_time',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        }
      },
      {},
      {},
    )).toThrow();
  });

    it('fail if State invalid for LDU event', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['LDU'],
        ['1'],
        ['0'],
        [NOW_ISO_STR],
      ],
      false,
      {
        '0': 'data_processing_options',
        '1': 'data_processing_options_country',
        '2': 'data_processing_options_state',
        '3': 'event_time',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        }
      },
      {},
      {},
    )).toThrow();
  });

  it('fail if State missing for LDU event', () => {
    expect(() => checkConfigForRawEventData(
      [
        ['LDU'],
        ['1'],
        [NOW_ISO_STR],
      ],
      false,
      {
        '0': 'data_processing_options',
        '1': 'data_processing_options_country',
        '2': 'event_time',
      },
      {
        event_time: {
          timeFormat: 'ISO8601',
        }
      },
      {},
      {},
    )).toThrow();
  });
});
