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

import type {WriteStream} from 'fs';

const os = require('os');

const {EOL} = os;

const REPORT_LINE_WIDTH = 80;
const DOUBLE_LINE_SEPARATOR = '='.repeat(REPORT_LINE_WIDTH) + EOL;
const SINGLE_LINE_SEPARATOR = '-'.repeat(REPORT_LINE_WIDTH) + EOL;

const DATA_PREPARE_URL = 'https://www.facebook.com/business/help/606443329504150';

function printHeader(stream: WriteStream, header: string) {
  stream.write(DOUBLE_LINE_SEPARATOR);
  stream.write(header + EOL);
  stream.write(DOUBLE_LINE_SEPARATOR);
}

type AdditionalInfoType = any;

type ErrorSample = {
  rowData: Array<string>,
  rowNumber: number,
  rejected: boolean,
  invalidFields: Array<{
    value: string,
    reverseMapping: string,
    propPath: string,
    infoForNormalization?: ?AdditionalInfoType,
    baseType: string,
    details?: ?AdditionalInfoType,
  }>,
  missingPropPaths: Array<{
    propPath: string,
  }>,
}

type ErrorReport = {
  invalidSamples: Array<ErrorSample>,
  aggregatedColumnStats: {
    [string]: {
      numEmpty: number,
      numInvalidAndRejected: number,
      numInvalidAndNotRejected: number,
    },
  },
  aggregatedMissingPropPaths: {[string]: number},
  numUnknownRejectErrors: number,
};

type Overview = {
  numRowsAlreadyUploaded: number,
  numRowsFailedToNormalize: number,
  numRowsFailedToUpload: number,
  numRowsUploaded: number,
};

type TestUploadWarning =
  | {
      type: 'no-events-accepted',
    }
  | {
      type: 'low-match-rate',
      matchRate: number,
    }
  | {
      type: 'low-pii-rate',
      noPiiRate: number,
    }
  | {
      type: 'not-assigned-to-account',
    }
  | {
      type: 'events-lagged-90d',
      count: number,
    }
  | {
      type: 'events-lagged-2d',
      count: number,
    }
  | {
      type: 'inaccurate-event-time',
    }
  | {
      type: 'same-value',
    }
  | {
      type: 'events-before-ad-account-assignment',
      accountID: string,
      accountName: string,
      count: number,
      assignTime: number,
    }
  | {
      type: 'events-rejected',
      count: number,
      summary: Array<{propPath: string, count: number}>,
      samples: Array<ErrorSample>,
    }
  | {
      type: 'events-incomplete',
      count: number,
      summary: Array<{
        mapping: string,
        count: number,
        columnIndex: number,
      }>,
      samples: Array<ErrorSample>,
    };

function getNumOfAllRows(overview: Overview): number {
  return overview.numRowsAlreadyUploaded
    + overview.numRowsFailedToNormalize
    + overview.numRowsFailedToUpload
    + overview.numRowsUploaded;
}

function printOverviewForUpload(
  stream: WriteStream,
  overview: Overview,
): void {
  printHeader(stream, 'Overview');
  const numAllRows = getNumOfAllRows(overview);
  stream.write(`Num all rows: ${numAllRows}${EOL}`);
  stream.write(
    `Num rows uploaded successfully: ${overview.numRowsUploaded}${EOL}`,
  );
  if (overview.numRowsAlreadyUploaded > 0) {
    stream.write(
      'Num rows skipped because of resuming: '
      + `${overview.numRowsAlreadyUploaded}${EOL}`,
    );
  }
  if (overview.numRowsFailedToNormalize > 0) {
    stream.write(
      'Num rows skipped because they are invalid: '
      + `${overview.numRowsFailedToNormalize}${EOL}`,
    );
  }
  if (overview.numRowsFailedToUpload > 0) {
    stream.write(
      'Num rows skipped because of API error: '
      + `${overview.numRowsFailedToUpload}${EOL}`,
    );
  }
  stream.write(EOL + EOL);
}

function printOverviewForPreprocess(
  stream: WriteStream,
  overview: Overview,
): void {
  printHeader(stream, 'Overview');
  const numAllRows = getNumOfAllRows(overview);
  stream.write(`Num all rows: ${numAllRows}${EOL}`);
  stream.write(
    'Num rows preprocessed and hashed successfully: '
    + `${overview.numRowsUploaded}${EOL}`,
  );
  if (overview.numRowsFailedToNormalize > 0) {
    stream.write(
      `Num rows invalid: ${overview.numRowsFailedToNormalize}${EOL}`,
    );
  }
  stream.write(EOL + EOL);
}

let isE2ETesting = false;

function setupE2E(): void {
  isE2ETesting = true;
}

function printReportTime(stream: WriteStream): void {
  if (!isE2ETesting) {
    // Omit this line in E2E testing as date will be different.
    stream.write(`Generated: ${(new Date()).toISOString()}` + EOL);
  } else {
    // Add this tag so output will be omitted in code review.
    // eslint-disable-next-line no-useless-concat
    stream.write('Generated: @' + 'generated' + EOL);
  }
}

function printConfig(
  stream: WriteStream,
  command: string,
  config: Object,
): void {
  printHeader(stream, `Report of ${command} command`);
  printReportTime(stream);
  stream.write(`Config: ${JSON.stringify(config, null, 2)}` + EOL);
  stream.write(EOL + EOL);
}

function printInvalidSample(
  stream: WriteStream,
  sample: ErrorSample,
  mappings: {[string]: string},
): void {
  stream.write(`Row ${sample.rowNumber}` + EOL);
  if (sample.rejected) {
    stream.write(`Rejected due to invalid or missing: ${
      sample.missingPropPaths.map(pp => pp.propPath).join(', ')
    }` + EOL);
  } else {
    stream.write('Accepted with error' + EOL);
  }
  stream.write(SINGLE_LINE_SEPARATOR);
  sample.rowData.forEach((data, index) => {
    if (data.length > 0) {
      const isInvalid = sample.invalidFields.find(
        field => parseInt(field.reverseMapping, 10) === index,
      );
      const mapping = mappings[String(index)] || 'not mapped';
      stream.write(
        `${isInvalid ? '[INVALID] ' : ' '.repeat(10)}` +
        `Column ${index} (${mapping}): ${data}` + EOL
      );
    }
  });
}

function printInvalidSamples(
  stream: WriteStream,
  samples: Array<ErrorSample>,
  mappings: {[string]: string},
): void {
  printHeader(stream, 'Invalid Samples');
  if (samples.length > 0) {
    samples.forEach(sample => {
      printInvalidSample(stream, sample, mappings);
      stream.write(EOL);
    });
  } else {
    stream.write('Woohoo! No Invalid Sample!' + EOL + EOL);
  }
  stream.write(EOL);
}

function printAggregatedError(
  stream: WriteStream,
  errorReport: ErrorReport,
  mappings: {[string]: string},
) {
  const {aggregatedColumnStats, aggregatedMissingPropPaths} = errorReport;
  const invalidPropPaths = Object.keys(aggregatedMissingPropPaths)
    .map(propPath => ({propPath, count: aggregatedMissingPropPaths[propPath]}))
    .sort((a, b) => b.count - a.count);

  const invalidColumns = Object.keys(aggregatedColumnStats)
    .map(column => {
      const stats = aggregatedColumnStats[column];
      return {
        column,
        count: stats.numInvalidAndRejected + stats.numInvalidAndNotRejected,
        mapping: mappings[column],
      };
    })
    .filter(err => err.count > 0)
    .sort((a, b) => b.count - a.count);
  if (invalidPropPaths.length > 0 || invalidColumns.length > 0) {
    printHeader(stream, 'Invalid data statistics');
    if (invalidPropPaths.length > 0) {
      stream.write(`Missing or invalid data${EOL}`);
      invalidPropPaths.forEach(err => stream.write(
        `  ${err.count} rows have invalid or missing ${err.propPath}.${EOL}`,
      ));
      stream.write(EOL);
    }
    if (invalidColumns.length > 0) {
      stream.write(`Columns with errors${EOL}`);
      invalidColumns.forEach(err => stream.write(
        `  ${err.count} errors on column ${err.column} (${err.mapping})${EOL}`,
      ));
      stream.write(EOL);
    }
    stream.write(EOL);
  }
}

function printLine(stream: WriteStream, line: string, indent: number = 0) {
  const result = [];
  const words = line
    .replace(/\n/g, '')
    .trim()
    .split(' ')
    .filter(w => w.length > 0);
  let curLine = '';
  let written = false;
  words.forEach(word => {
    if (curLine === '') {
      curLine = word;
    } else {
      if (word.length + curLine.length + indent + 1 < REPORT_LINE_WIDTH) {
        curLine += ' ' + word;
      } else {
        result.push(' '.repeat(indent) + curLine + EOL);
        curLine = word;
        written = true;
      }
    }
  });
  if (curLine !== '') {
    result.push(' '.repeat(indent) + curLine + EOL);
    written = true;
  }
  if (!written) {
    result.push(EOL);
  }
  stream.write(result.join(''));
}

function formatPercentage(numerator: number, denominator: number): string {
  if (denominator === 0) {
    return 'N/A';
  } else {
    return `${(numerator / denominator * 100).toFixed(2)}%`;
  }
}

function printWarning(
  stream: WriteStream,
  warning: TestUploadWarning,
  level: string,
) {
  if (warning.type === 'no-events-accepted') {
    printHeader(stream, `[${level}] No Sample Events Were Accepted`);
    printLine(stream, 'ISSUE:');
    printLine(
      stream,
      `We did not find any acceptable events after sampling your file.
      We predict that low-to-no events will be uploaded.`
    );
    stream.write(SINGLE_LINE_SEPARATOR);
    printLine(stream, 'SOLUTION:');
    printLine(
      stream,
      `Review the data preparation best practices (${DATA_PREPARE_URL}).
      If your data meets these guidelines, please check the data mapping
      and try again.`
    );
    stream.write(EOL + EOL);
  }

  if (warning.type === 'low-match-rate') {
    printHeader(stream, `[${level}] Low match rate`);
    printLine(stream, 'ISSUE:');
    printLine(
      stream,
      `Your match rate is lower than the average for offline
      events. This typically occurs because the data you've
      provided has too few identifiers to match your customers to
      people on Facebook.`
    );
    stream.write(SINGLE_LINE_SEPARATOR);
    printLine(stream, 'SOLUTION:');
    printLine(
      stream,
      `Review your mapping to make sure you've successfully mapped
      as many customer identifiers as possible. You can also edit
      the file to include additional customer data. Note that even
      with your current match rate, you can still upload your data
      to Facebook.`
    );
    stream.write(EOL + EOL);
  }

  if (warning.type === 'low-pii-rate') {
    printHeader(
      stream,
      `[${level}] Some of Your Events Do Not Have Valid Customer Identifiers`,
    );
    printLine(stream, 'ISSUE:');
    printLine(
      stream,
      `Some of your events are either missing or have no valid
      customer identifiers. These are needed to match your
      customers to people on Facebook and thus in turn be used for
      attribution.`
    );
    stream.write(SINGLE_LINE_SEPARATOR);
    printLine(stream, 'SOLUTION:');
    printLine(
      stream,
      `Review your mapping to make sure you've successfully mapped
      customer identifiers. Also review the file to correct any
      invalid customer data and include customer data where it's
      missing. Note that you can still upload your data to
      Facebook.`
    );
    stream.write(EOL + EOL);
  }

  if (warning.type === 'not-assigned-to-account') {
    printHeader(
      stream,
      `[${level}] Your Offline Event Set is Not Assigned to an Ad Account`,
    );
    printLine(stream, 'ISSUE:');
    printLine(
      stream,
      `Without an assigned ad account, you won't be able to
      attribute any of these events to active ad campaigns.`
    );
    stream.write(SINGLE_LINE_SEPARATOR);
    printLine(stream, 'SOLUTION:');
    printLine(
      stream,
      `Contact your business admin to assign an ad account to
      this offline events set.
      Note that you won't be able to attribute any events to ads
      that were running prior to assigning the ad account. You can
      still upload these events and use them for lift tests,
      custom audiences and analytics.`
    );
    stream.write(EOL + EOL);
  }

  if (warning.type === 'events-lagged-90d') {
    printHeader(
      stream,
      `[${level}] ${warning.count} Events Occurred More Than 90 Days Ago`,
    );
    printLine(stream, 'ISSUE:');
    printLine(
      stream,
      `Facebook can't attribute events that occurred more than 90
      days ago to a Facebook ad campaign.`
    );
    stream.write(SINGLE_LINE_SEPARATOR);
    printLine(stream, 'SOLUTION:');
    printLine(
      stream,
      `Upload your events more frequently. We recommend automating
      the upload process using the Facebook SDK or offline events
      API. Note that you can still upload these events, and use
      them for lift tests, custom audiences and analytics.`
    );
    stream.write(EOL + EOL);
  }

  if (warning.type === 'events-lagged-2d') {
    printHeader(
      stream,
      `[${level}] ${warning.count} Events Occurred More Than 48 Hours Ago`,
    );
    printLine(stream, 'ISSUE:');
    printLine(stream,
      `Only events occurring within the last 48 hours are eligible
      for offline optimization.`
    );
    stream.write(SINGLE_LINE_SEPARATOR);
    printLine(stream, 'SOLUTION:');
    printLine(
      stream,
      `Upload your events more frequently. We recommend automating
      the upload process using the Facebook SDK or offline events
      API. Note that you can still upload these events and use
      them for attribution, lift tests, custom audiences and
      analytics.`
    );
    stream.write(EOL + EOL);
  }

  if (warning.type === 'inaccurate-event-time') {
    printHeader(
      stream,
      `[${level}] Some of Your Timestamps are Inaccurate`,
    );
    printLine(stream, 'ISSUE:');
    printLine(
      stream,
      `A significant number of your events are using the same
      timestamp. This may cause these events to be counted as
      duplicates, which will negatively impact attribution.`
    );
    stream.write(SINGLE_LINE_SEPARATOR);
    printLine(stream, 'SOLUTION:');
    printLine(
      stream,
      `For future uploads, add timestamps that are accurate to the
      minute or second.`
    );
    stream.write(EOL + EOL);
  }

  if (warning.type === 'same-value') {
    printHeader(
      stream,
      `[${level}] All Sample Events Have the Same Value`,
    );
    printLine(stream, 'ISSUE:');
    printLine(
      stream,
      `All the events in your sample are showing the same value. If
      these numbers are inaccurate, they will reduce the accuracy
      of your reporting, and may affect value-based lookalike
      audiences.`
    );
    stream.write(SINGLE_LINE_SEPARATOR);
    printLine(stream, 'SOLUTION:');
    printLine(
      stream,
      `Update your event values with accurate numbers. You may need
      to update your file, or use a new file.`
    );
    stream.write(EOL + EOL);
  }

  if (warning.type === 'events-before-ad-account-assignment') {
    printHeader(
      stream,
      `[${level}] ${warning.count} Events ` +
      'Occurred Prior to an Ad Account Being Assigned',
    );
    printLine(stream, 'ISSUE:');
    const time = (new Date(warning.assignTime * 1000)).toISOString();
    printLine(
      stream,
      `The offline event set was assigned to ${warning.accountName}
      (${warning.accountID}) on ${time}.
      Any events that occurred prior to this date
      will not be attributed to ads created by this ad account.`
    );
    stream.write(SINGLE_LINE_SEPARATOR);
    printLine(stream, 'SOLUTION:');
    printLine(
      stream,
      `Events occurring prior to an account being assigned will not
      be attributed, but can still be used for lift tests, custom
      audiences and analytics.`
    );
    stream.write(EOL + EOL);
  }

  if (warning.type === 'events-rejected') {
    printHeader(
      stream,
      `[${level}] ${warning.count} Events Were Not Accepted`,
    );
    printLine(stream, 'ISSUE:');
    printLine(
      stream,
      `${warning.count} events will not be uploaded due to invalid or missing
      data.`
    );
    stream.write(SINGLE_LINE_SEPARATOR);
    printLine(stream, 'SOLUTION:');
    printLine(
      stream,
      `Review your data mapping. You may need to update your data
      and upload a new file. See samples of rejected events at the bottom of
      the file.`
    );
    warning.summary.forEach(s => {
      printLine(
        stream,
        `${s.count} events have invalid or missing ${s.propPath}.`,
        4,
      );
    });
    stream.write(EOL + EOL);
  }

  if (warning.type === 'events-incomplete') {
    printHeader(
      stream,
      `[${level}] ${warning.count} Events Have Invalid Fields`,
    );
    printLine(stream, 'ISSUE:');
    printLine(
      stream,
      `${warning.count} events have invalid fields. Invalid fields will be
      dropped during upload, which may impact your overall match rate.`
    );
    stream.write(SINGLE_LINE_SEPARATOR);
    printLine(stream, 'SOLUTION:');
    printLine(
      stream,
      `Check to see if you may have data mapping or formatting errors.
      See samples of events with invalid fields at the bottom of the file.`
    );
    warning.summary.forEach(s => {
      printLine(
        stream,
        `${s.count} events have invalid ${s.mapping} at column
        ${s.columnIndex}.`,
        4
      );
    });
    stream.write(EOL + EOL);
  }
}

module.exports = {
  formatPercentage,
  printAggregatedError,
  printConfig,
  printHeader,
  printInvalidSamples,
  printLine,
  printOverviewForPreprocess,
  printOverviewForUpload,
  printReportTime,
  printWarning,
  setupE2E,
  EOL,
  REPORT_LINE_WIDTH,
  DOUBLE_LINE_SEPARATOR,
  SINGLE_LINE_SEPARATOR,
};
