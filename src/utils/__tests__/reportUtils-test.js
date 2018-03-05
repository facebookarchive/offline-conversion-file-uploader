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
  .mock('os', () => ({EOL: '\n'}));

const reportUtils = require('../reportUtils');

const {
  formatPercentage,
  printAggregatedError,
  printConfig,
  printHeader,
  printInvalidSamples,
  printLine,
  printOverviewForPreprocess,
  printOverviewForUpload,
  printWarning,
} = reportUtils;

class MockStream {
  constructor() {
    this.output = '';
  }

  write(text: string) {
    this.output += text;
  }
}

describe('formatPercentage', () => {
  it('denominator is 0', () => {
    expect(formatPercentage(0, 0)).toBe('N/A');
  });

  it('100%', () => {
    expect(formatPercentage(1000, 1000)).toBe('100.00%');
  });

  it('1%', () => {
    expect(formatPercentage(10000, 1000000)).toBe('1.00%');
  });
});

describe('printAggregatedError', () => {
  it('no error', () => {
    const stream = new MockStream();
    printAggregatedError(
      stream,
      {
        invalidSamples: [],
        aggregatedColumnStats: {
          '0': {
            numEmpty: 0,
            numInvalidAndRejected: 0,
            numInvalidAndNotRejected: 0,
          },
          '1': {
            numEmpty: 0,
            numInvalidAndRejected: 0,
            numInvalidAndNotRejected: 0,
          },
          '2': {
            numEmpty: 0,
            numInvalidAndRejected: 0,
            numInvalidAndNotRejected: 0,
          },
        },
        aggregatedMissingPropPaths: {},
        numUnknownRejectErrors: 0,
      },
      {
        '0': 'event_time',
        '1': 'event_name',
        '2': 'match_keys.email',
      },
    );
    expect(stream.output).toBe('');
  });

  it('missing props', () => {
    const stream = new MockStream();
    printAggregatedError(
      stream,
      {
        invalidSamples: [],
        aggregatedColumnStats: {
          '0': {
            numEmpty: 0,
            numInvalidAndRejected: 0,
            numInvalidAndNotRejected: 0,
          },
          '1': {
            numEmpty: 0,
            numInvalidAndRejected: 0,
            numInvalidAndNotRejected: 0,
          },
          '2': {
            numEmpty: 0,
            numInvalidAndRejected: 0,
            numInvalidAndNotRejected: 0,
          },
        },
        aggregatedMissingPropPaths: {
          'value': 10,
          'currency': 20,
        },
        numUnknownRejectErrors: 0,
      },
      {
        '0': 'event_time',
        '1': 'event_name',
        '2': 'match_keys.email',
      },
    );
    expect(stream.output).toBe(
`================================================================================
Invalid data statistics
================================================================================
Missing or invalid data
  20 rows have invalid or missing currency.
  10 rows have invalid or missing value.


`,
    );
  });

  it('column error', () => {
    const stream = new MockStream();
    printAggregatedError(
      stream,
      {
        invalidSamples: [],
        aggregatedColumnStats: {
          '0': {
            numEmpty: 0,
            numInvalidAndRejected: 0,
            numInvalidAndNotRejected: 0,
          },
          '1': {
            numEmpty: 0,
            numInvalidAndRejected: 0,
            numInvalidAndNotRejected: 0,
          },
          '2': {
            numEmpty: 1,
            numInvalidAndRejected: 0,
            numInvalidAndNotRejected: 2,
          },
          '3': {
            numEmpty: 3,
            numInvalidAndRejected: 0,
            numInvalidAndNotRejected: 4,
          },
        },
        aggregatedMissingPropPaths: {},
        numUnknownRejectErrors: 0,
      },
      {
        '0': 'event_time',
        '1': 'event_name',
        '2': 'match_keys.email',
        '3': 'match_keys.phone',
      },
    );
    expect(stream.output).toBe(
`================================================================================
Invalid data statistics
================================================================================
Columns with errors
  4 errors on column 3 (match_keys.phone)
  2 errors on column 2 (match_keys.email)


`,
    );
  });

  it('both', () => {
    const stream = new MockStream();
    printAggregatedError(
      stream,
      {
        invalidSamples: [],
        aggregatedColumnStats: {
          '0': {
            numEmpty: 1,
            numInvalidAndRejected: 2,
            numInvalidAndNotRejected: 0,
          },
          '1': {
            numEmpty: 3,
            numInvalidAndRejected: 4,
            numInvalidAndNotRejected: 0,
          },
          '2': {
            numEmpty: 5,
            numInvalidAndRejected: 6,
            numInvalidAndNotRejected: 7,
          },
          '3': {
            numEmpty: 8,
            numInvalidAndRejected: 9,
            numInvalidAndNotRejected: 10,
          },
        },
        aggregatedMissingPropPaths: {
          event_time: 2,
          event_name: 4,
          match_keys: 5,
        },
        numUnknownRejectErrors: 0,
      },
      {
        '0': 'event_time',
        '1': 'event_name',
        '2': 'match_keys.email',
        '3': 'match_keys.phone',
      },
    );
    expect(stream.output).toBe(
`================================================================================
Invalid data statistics
================================================================================
Missing or invalid data
  5 rows have invalid or missing match_keys.
  4 rows have invalid or missing event_name.
  2 rows have invalid or missing event_time.

Columns with errors
  19 errors on column 3 (match_keys.phone)
  13 errors on column 2 (match_keys.email)
  4 errors on column 1 (event_name)
  2 errors on column 0 (event_time)


`,
    );
  });
});

describe('printConfig', () => {
  let toISOStringBackup = Date.prototype.toISOString;
  /* eslint-disable no-extend-native */
  Date.prototype.toISOString = () => '<DATE>';
  const stream = new MockStream();
  printConfig(stream, 'test', {x: 42, foo: 'bar'});
  expect(stream.output).toBe(
`================================================================================
Report of test command
================================================================================
Generated: <DATE>
Config: {
  "x": 42,
  "foo": "bar"
}


`,
);
  /* eslint-disable no-extend-native */
  Date.prototype.toISOString = toISOStringBackup;
});

describe('printHeader', () => {
  const stream = new MockStream();
  printHeader(stream, 'header');
  expect(stream.output).toBe(
`================================================================================
header
================================================================================
`,
  );
});

describe('printInvalidSamples', () => {
  it('no invalid sample', () => {
    const stream = new MockStream();
    printInvalidSamples(stream, [], {});
    expect(stream.output).toBe(
`================================================================================
Invalid Samples
================================================================================
Woohoo! No Invalid Sample!


`
    );
  });

  it('some invalid samples', () => {
    const stream = new MockStream();
    const now = String(Math.floor(Date.now() / 1000));
    printInvalidSamples(
      stream,
      [
        {
          rowData: [
            'test@fb.com',
            '1(412)000-0000',
            'INVALID-EVENT-TIME',
            'Purchase',
            '-1',
            'USD',
          ],
          rowNumber: 5,
          rejected: true,
          invalidFields: [
            {
              value: 'INVALID-EVENT-TIME',
              reverseMapping: '2',
              propPath: 'event_time',
              baseType: 'unix_time',
            },
            {
              value: '-1',
              reverseMapping: '4',
              propPath: 'value',
              baseType: 'number',
            },
          ],
          missingPropPaths: [
            {propPath: 'event_time'},
            {propPath: 'value'},
          ],
        },
        {
          rowData: [
            'test@fb.com',
            'INVALID-PHONE',
            now,
            'Purchase',
            '1',
            'USD',
          ],
          rowNumber: 15,
          rejected: false,
          invalidFields: [
            {
              value: 'INVALID-PHONE',
              reverseMapping: '1',
              propPath: 'match_keys.phone',
              baseType: 'phone_number',
            },
          ],
          missingPropPaths: [],
        },
      ],
      {
        '0': 'match_keys.email',
        '1': 'match_keys.phone',
        '2': 'event_time',
        '3': 'event_name',
        '4': 'value',
        '5': 'currency',
      },
    );

    expect(stream.output).toBe(
`================================================================================
Invalid Samples
================================================================================
Row 5
Rejected due to invalid or missing: event_time, value
--------------------------------------------------------------------------------
          Column 0 (match_keys.email): test@fb.com
          Column 1 (match_keys.phone): 1(412)000-0000
[INVALID] Column 2 (event_time): INVALID-EVENT-TIME
          Column 3 (event_name): Purchase
[INVALID] Column 4 (value): -1
          Column 5 (currency): USD

Row 15
Accepted with error
--------------------------------------------------------------------------------
          Column 0 (match_keys.email): test@fb.com
[INVALID] Column 1 (match_keys.phone): INVALID-PHONE
          Column 2 (event_time): ${now}
          Column 3 (event_name): Purchase
          Column 4 (value): 1
          Column 5 (currency): USD


`,
    );
  });
});

describe('printLine', () => {
  it('empty', () => {
    const stream = new MockStream();
    printLine(stream, '');
    expect(stream.output).toBe('\n');
  });

  it('single line', () => {
    const stream = new MockStream();
    printLine(stream, 'Hello world!');
    expect(stream.output).toBe('Hello world!\n');
  });

  it('long line', () => {
    const stream = new MockStream();
    printLine(
      stream,
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Praesent varius sem non nunc placerat iaculis.
      Proin vulputate tristique risus, quis posuere tellus venenatis ut.
      Ut sodales massa at volutpat.`,
    );
    expect(stream.output).toBe(
`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent varius sem
non nunc placerat iaculis. Proin vulputate tristique risus, quis posuere tellus
venenatis ut. Ut sodales massa at volutpat.
`,
    );
  });

  it('long word', () => {
    const stream = new MockStream();
    printLine(
      stream,
      `The longest word in any of the major English language dictionaries is
      pneumonoultramicroscopicsilicovolcanoconiosis, a word that refers to a
      lung disease contracted from the inhalation of very fine silica
      particles, specifically from a volcano; medically,
      it is the same as silicosis.`,
    );
    expect(stream.output).toBe(
`The longest word in any of the major English language dictionaries is
pneumonoultramicroscopicsilicovolcanoconiosis, a word that refers to a lung
disease contracted from the inhalation of very fine silica particles,
specifically from a volcano; medically, it is the same as silicosis.
`
    );
  });

  it('indentation', () => {
    const stream = new MockStream();
    printLine(
      stream,
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Praesent varius sem non nunc placerat iaculis.
      Proin vulputate tristique risus, quis posuere tellus venenatis ut.
      Ut sodales massa at volutpat.`,
      8,
    );
    expect(stream.output).toBe(
`        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
        varius sem non nunc placerat iaculis. Proin vulputate tristique risus,
        quis posuere tellus venenatis ut. Ut sodales massa at volutpat.
`,
    );
  });
});

describe('printOverviewForPreprocess', () => {
  it('no issue', () => {
    const stream = new MockStream();
    printOverviewForPreprocess(
      stream,
      {
        numRowsAlreadyUploaded: 0,
        numRowsFailedToNormalize: 0,
        numRowsFailedToUpload: 0,
        numRowsUploaded: 10000,
      },
    );
    expect(stream.output).toBe(
`================================================================================
Overview
================================================================================
Num all rows: 10000
Num rows preprocessed and hashed successfully: 10000


`,
    );
  });

  it('some invalid rows', () => {
    const stream = new MockStream();
    printOverviewForPreprocess(
      stream,
      {
        numRowsAlreadyUploaded: 0,
        numRowsFailedToNormalize: 2000,
        numRowsFailedToUpload: 0,
        numRowsUploaded: 8000,
      },
    );
    expect(stream.output).toBe(
`================================================================================
Overview
================================================================================
Num all rows: 10000
Num rows preprocessed and hashed successfully: 8000
Num rows invalid: 2000


`,
    );
  });
});

describe('printOverviewForUpload', () => {
  it('no issue', () => {
    const stream = new MockStream();
    printOverviewForUpload(
      stream,
      {
        numRowsAlreadyUploaded: 0,
        numRowsFailedToNormalize: 0,
        numRowsFailedToUpload: 0,
        numRowsUploaded: 10000,
      },
    );
    expect(stream.output).toBe(
`================================================================================
Overview
================================================================================
Num all rows: 10000
Num rows uploaded successfully: 10000


`,
    );
  });

  it('no issue', () => {
    const stream = new MockStream();
    printOverviewForUpload(
      stream,
      {
        numRowsAlreadyUploaded: 1000,
        numRowsFailedToNormalize: 2000,
        numRowsFailedToUpload: 3000,
        numRowsUploaded: 4000,
      },
    );
    expect(stream.output).toBe(
`================================================================================
Overview
================================================================================
Num all rows: 10000
Num rows uploaded successfully: 4000
Num rows skipped because of resuming: 1000
Num rows skipped because they are invalid: 2000
Num rows skipped because of API error: 3000


`,
    );
  });
});

describe('printWarning', () => {
  it('no-events-accepted', () => {
    const stream = new MockStream();
    printWarning(stream, {type: 'no-events-accepted'}, 'ERROR');
    expect(stream.output).toBe(
`================================================================================
[ERROR] No Sample Events Were Accepted
================================================================================
ISSUE:
We did not find any acceptable events after sampling your file. We predict that
low-to-no events will be uploaded.
--------------------------------------------------------------------------------
SOLUTION:
Review the data preparation best practices
(https://www.facebook.com/business/help/606443329504150). If your data meets
these guidelines, please check the data mapping and try again.


`,
    );
  });

  it('low-match-rate', () => {
    const stream = new MockStream();
    printWarning(stream, {type: 'low-match-rate'}, 'WARNING');
    expect(stream.output).toBe(
`================================================================================
[WARNING] Low match rate
================================================================================
ISSUE:
Your match rate is lower than the average for offline events. This typically
occurs because the data you've provided has too few identifiers to match your
customers to people on Facebook.
--------------------------------------------------------------------------------
SOLUTION:
Review your mapping to make sure you've successfully mapped as many customer
identifiers as possible. You can also edit the file to include additional
customer data. Note that even with your current match rate, you can still
upload your data to Facebook.


`,
    );
  });

  it('low-pii-rate', () => {
    const stream = new MockStream();
    printWarning(stream, {type: 'low-pii-rate'}, 'WARNING');
    expect(stream.output).toBe(
`================================================================================
[WARNING] Some of Your Events Do Not Have Valid Customer Identifiers
================================================================================
ISSUE:
Some of your events are either missing or have no valid customer identifiers.
These are needed to match your customers to people on Facebook and thus in turn
be used for attribution.
--------------------------------------------------------------------------------
SOLUTION:
Review your mapping to make sure you've successfully mapped customer
identifiers. Also review the file to correct any invalid customer data and
include customer data where it's missing. Note that you can still upload your
data to Facebook.


`,
    );
  });

  it('not-assigned-to-account', () => {
    const stream = new MockStream();
    printWarning(stream, {type: 'not-assigned-to-account'}, 'ERROR');
    expect(stream.output).toBe(
`================================================================================
[ERROR] Your Offline Event Set is Not Assigned to an Ad Account
================================================================================
ISSUE:
Without an assigned ad account, you won't be able to attribute any of these
events to active ad campaigns.
--------------------------------------------------------------------------------
SOLUTION:
Contact your business admin to assign an ad account to this offline events set.
Note that you won't be able to attribute any events to ads that were running
prior to assigning the ad account. You can still upload these events and use
them for lift tests, custom audiences and analytics.


`,
    );
  });

  it('events-lagged-90d', () => {
    const stream = new MockStream();
    printWarning(stream, {type: 'events-lagged-90d', count: 123}, 'ERROR');
    expect(stream.output).toBe(
`================================================================================
[ERROR] 123 Events Occurred More Than 90 Days Ago
================================================================================
ISSUE:
Facebook can't attribute events that occurred more than 90 days ago to a
Facebook ad campaign.
--------------------------------------------------------------------------------
SOLUTION:
Upload your events more frequently. We recommend automating the upload process
using the Facebook SDK or offline events API. Note that you can still upload
these events, and use them for lift tests, custom audiences and analytics.


`,
    );
  });

  it('events-lagged-2d', () => {
    const stream = new MockStream();
    printWarning(stream, {type: 'events-lagged-2d', count: 456}, 'WARNING');
    expect(stream.output).toBe(
`================================================================================
[WARNING] 456 Events Occurred More Than 48 Hours Ago
================================================================================
ISSUE:
Only events occurring within the last 48 hours are eligible for offline
optimization.
--------------------------------------------------------------------------------
SOLUTION:
Upload your events more frequently. We recommend automating the upload process
using the Facebook SDK or offline events API. Note that you can still upload
these events and use them for attribution, lift tests, custom audiences and
analytics.


`,
    );
  });

  it('inaccurate-event-time', () => {
    const stream = new MockStream();
    printWarning(stream, {type: 'inaccurate-event-time'}, 'WARNING');
    expect(stream.output).toBe(
`================================================================================
[WARNING] Some of Your Timestamps are Inaccurate
================================================================================
ISSUE:
A significant number of your events are using the same timestamp. This may
cause these events to be counted as duplicates, which will negatively impact
attribution.
--------------------------------------------------------------------------------
SOLUTION:
For future uploads, add timestamps that are accurate to the minute or second.


`,
    );
  });

  it('same-value', () => {
    const stream = new MockStream();
    printWarning(stream, {type: 'same-value'}, 'WARNING');
    expect(stream.output).toBe(
`================================================================================
[WARNING] All Sample Events Have the Same Value
================================================================================
ISSUE:
All the events in your sample are showing the same value. If these numbers are
inaccurate, they will reduce the accuracy of your reporting, and may affect
value-based lookalike audiences.
--------------------------------------------------------------------------------
SOLUTION:
Update your event values with accurate numbers. You may need to update your
file, or use a new file.


`,
    );
  });

  it('events-before-ad-account-assignment', () => {
    const stream = new MockStream();
    const unixNow = Math.floor(Date.now() / 1000);
    const unixNowISO = (new Date(unixNow * 1000)).toISOString();
    printWarning(
      stream,
      {
        type: 'events-before-ad-account-assignment',
        accountID: '111111111',
        accountName: 'act-111111111',
        count: 789,
        assignTime: unixNow,
      },
      'ERROR',
    );
    expect(stream.output).toBe(
`================================================================================
[ERROR] 789 Events Occurred Prior to an Ad Account Being Assigned
================================================================================
ISSUE:
The offline event set was assigned to act-111111111 (111111111) on
${unixNowISO}. Any events that occurred prior to this date will not
be attributed to ads created by this ad account.
--------------------------------------------------------------------------------
SOLUTION:
Events occurring prior to an account being assigned will not be attributed, but
can still be used for lift tests, custom audiences and analytics.


`,
    );
  });

  it('events-rejected', () => {
    const stream = new MockStream();
    printWarning(
      stream,
      {
        type: 'events-rejected',
        count: 123,
        summary: [
          {propPath: 'event_time', count: 98},
          {propPath: 'value', count: 76},
          {propPath: 'currency', count: 54},
        ],
        samples: [],
      },
      'ERROR',
    );
    expect(stream.output).toBe(
`================================================================================
[ERROR] 123 Events Were Not Accepted
================================================================================
ISSUE:
123 events will not be uploaded due to invalid or missing data.
--------------------------------------------------------------------------------
SOLUTION:
Review your data mapping. You may need to update your data and upload a new
file. See samples of rejected events at the bottom of the file.
    98 events have invalid or missing event_time.
    76 events have invalid or missing value.
    54 events have invalid or missing currency.


`,
    );
  });

  it('events-incomplete', () => {
    const stream = new MockStream();
    printWarning(
      stream,
      {
        type: 'events-incomplete',
        count: 456,
        summary: [
          {mapping: 'match_keys.email', count: 345, columnIndex: 3},
          {mapping: 'match_keys.phone', count: 234, columnIndex: 2},
          {mapping: 'custom_data.model', count: 123, columnIndex: 7},
        ],
        samples: [],
      },
      'WARNING',
    );
    expect(stream.output).toBe(
`================================================================================
[WARNING] 456 Events Have Invalid Fields
================================================================================
ISSUE:
456 events have invalid fields. Invalid fields will be dropped during upload,
which may impact your overall match rate.
--------------------------------------------------------------------------------
SOLUTION:
Check to see if you may have data mapping or formatting errors. See samples of
events with invalid fields at the bottom of the file.
    345 events have invalid match_keys.email at column 3.
    234 events have invalid match_keys.phone at column 2.
    123 events have invalid custom_data.model at column 7.


`,
    );
  });
});
