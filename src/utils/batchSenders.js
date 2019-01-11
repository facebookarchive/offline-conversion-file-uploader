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

const fs = require('fs');
const graphAPIUtils = require('../utils/graphAPIUtils');
const os = require('os');
const Promise = require('promise');
const winston = require('winston');

const {graphAPI} = graphAPIUtils;

const {EOL} = os;

const ERROR_CODE_PROGRESS_OVERLAP = 2044011;
const UINT_MAX = 4294967296;
const UPLOAD_SOURCE = 'MDFU V2.00';

let isE2E = false;

type Batch = {
  start: number,
  end: number,
  rows: Array<Object>,
};

type BatchSender = (batch: Batch) => Promise<void>;

function setupE2E() {
  isE2E = true;
}

function getGraphAPICallbacks(
  resolve: () => void,
  reject: (error: Error) => void,
  batch: Batch,
): {
  thenCallback: () => void,
  catchCallback: (error: Error) => void,
} {
  const thenCallback = () => {
    winston.debug(`Batch [${batch.start}, ${batch.end}): sent`);
    resolve();
  };
  const catchCallback = error => {
    if ((error: Object).is_network_error) {
      winston.warn(`Batch [${batch.start}, ${batch.end}): network error`);
    } else {
      winston.warn(
        `Batch [${batch.start}, ${batch.end}): API error: ` +
        `${error.message || 'Unknown error'}`,
      );
    }
    reject(error);
  };
  return {
    thenCallback,
    catchCallback,
  };
}

function getOfflineEventsBatchSender(
  accessToken: string,
  dataSetID: string,
  uploadID: string,
  namespaceID: ?string,
  enableProgressTracking: boolean,
): BatchSender {
  return (batch: Batch) => {
    return new Promise((resolve, reject) => {
      const params: Object = {
        access_token: accessToken,
        suppress_http_code: 1,
        data: batch.rows,
        upload_id: uploadID,
      };
      if (!isE2E) {
        params.upload_source = UPLOAD_SOURCE;
      }
      if (namespaceID != null) {
        params.namespace_id = namespaceID;
      }
      if (enableProgressTracking) {
        params.progress = {
          start_inclusive: batch.start,
          end_exclusive: batch.end,
        };
      }
      const {
        thenCallback,
        catchCallback,
      } = getGraphAPICallbacks(resolve, reject, batch);
      graphAPI(`${dataSetID}/events`, 'POST', params)
        .catch(catchCallback)
        .then(thenCallback);
      winston.debug(`Batch [${batch.start}, ${batch.end}): sending`);
    });
  };
}

function getColumnsFromMappingsForCustomAudience(
  mapping: Object,
): Array<string> {
  const mappedPropKeys = Object.values(mapping)
    .filter(propPath => {
      return (
        propPath != null &&
        typeof propPath === 'string' &&
        propPath.trim().length > 0
      );
    })
    .map(propPath => {
      const parts = String(propPath).split('.');
      return parts[parts.length - 1];
    });

  const apiSchema = [];
  mappedPropKeys.forEach(propKey => {
    switch (propKey) {
      case 'dob':
        apiSchema.push('doby', 'dobm', 'dobd');
        break;

      case 'fn':
        apiSchema.push('fn', 'fi', 'f5first');
        break;

      case 'ln':
        apiSchema.push('ln', 'f5last');
        break;

      case 'age':
        apiSchema.push('doby');
        break;

      default:
        apiSchema.push(propKey);
    }
  });

  const apiSchemaWithDuplicateDobyRemoved = [];
  let dobyPushed = false;
  apiSchema.forEach(propKey => {
    if (propKey === 'doby') {
      if (!dobyPushed) {
        dobyPushed = true;
        apiSchemaWithDuplicateDobyRemoved.push(propKey);
      }
    } else {
      apiSchemaWithDuplicateDobyRemoved.push(propKey);
    }
  });

  return apiSchemaWithDuplicateDobyRemoved;
}

function getCustomAudienceBatchSender(
  accessToken: string,
  audienceID: string,
  sessionID: ?number,
  mapping: Object,
  method: 'POST' | 'DELETE',
  appIDs: ?Array<string>,
  pageIDs: ?Array<string>,
): {
  batchSender: BatchSender,
  lastDummyBatchSender: () => Promise<void>,
} {
  if (sessionID == null) {
    sessionID = Math.floor(Math.random() * UINT_MAX);
  }
  const columns = getColumnsFromMappingsForCustomAudience(mapping);
  const schema = columns.map(column => column.toUpperCase());
  const batchSender = (batch: Batch) => {
    return new Promise((resolve, reject) => {
      const data = batch.rows.map(row => {
        const normalizedValue = JSON.parse(JSON.stringify(row));
        return columns.map(propKey => {
          propKey = propKey.toLowerCase();
          let value, parent;
          if (normalizedValue[propKey] != null) {
            value = normalizedValue[propKey];
            parent = normalizedValue;
          } else if (
            normalizedValue.match_keys != null &&
            normalizedValue.match_keys[propKey]
          ) {
            value = normalizedValue.match_keys[propKey];
            parent = normalizedValue.match_keys;
          }
          if (Array.isArray(value)) {
            value = value.shift();
          } else if (parent != null) {
            parent[propKey] = null;
          }
          return value || '';
        });
      });
      const params: Object = {
        access_token: accessToken,
        payload: {
          app_ids: appIDs,
          page_ids: pageIDs,
          schema,
          data,
        },
        session: {
          last_batch_flag: false,
          session_id: sessionID,
        },
      };
      const {
        thenCallback,
        catchCallback,
      } = getGraphAPICallbacks(resolve, reject, batch);
      graphAPI(`${audienceID}/users`, method, params)
        .catch(catchCallback)
        .then(thenCallback);
      winston.debug(`Batch [${batch.start}, ${batch.end}): sending`);
    });
  };
  const lastDummyBatchSender = () => {
    const params: Object = {
      access_token: accessToken,
      payload: {
        app_ids: appIDs,
        page_ids: pageIDs,
        schema,
        // A row of dummy data (non zero) as payload.
        data: [schema.map(() => '1')],
      },
      session: {
        batch_seq: 1,
        last_batch_flag: true,
        session_id: sessionID,
      },
    };
    return graphAPI(`${audienceID}/users`, method, params);
  };
  return {
    batchSender,
    lastDummyBatchSender,
  };
}

function getColumnsFromMappingsForOfflineEvents(
  mappings: Object,
  presetValues: {event_name?: ?string, currency?: ?string},
): Array<string> {
  const columns = [];
  Object.values(mappings).forEach(mapping => {
    switch (String(mapping).toLowerCase()) {
      case 'match_keys.fn':
        columns.push('match_keys.fn');
        columns.push('match_keys.fi');
        columns.push('match_keys.f5first');
        break;

      case 'match_keys.ln':
        columns.push('match_keys.ln');
        columns.push('match_keys.f5last');
        break;

      case 'match_keys.dob':
        // Make sure doby is pushed only once.
        if (!columns.includes('match_keys.doby')) {
          columns.push('match_keys.doby');
        }
        columns.push('match_keys.dobm');
        columns.push('match_keys.dobd');
        break;

      case 'match_keys.age':
        // Make sure doby is pushed only once.
        if (!columns.includes('match_keys.doby')) {
          columns.push('match_keys.doby');
        }
        break;

      default:
        columns.push(String(mapping));
        break;
    }
  });
  if (presetValues.event_name != null && !columns.includes('event_name')) {
    columns.push('event_name');
  }
  if (presetValues.currency != null && !columns.includes('currency')) {
    columns.push('currency');
  }
  return columns;
}

function getHeaderFromColumns(
  columns: Array<string>,
  customTypeInfo: {[string]: {baseType: string}},
): string {
  return columns.map(column => {
    if (column.startsWith('custom_data')) {
      const key = column.substring(column.indexOf('.') + 1);
      // Embed custom field type into its column name.
      // So header for 'custom_data.xyz' will be 'custom_data.xyz:text' if
      // it is a text column, or 'custom_data.xyz:number' if otherwise.
      const postfix =
        (customTypeInfo[key] && customTypeInfo[key].baseType) || 'text';
      return column + ':' + postfix;
    } else {
      return column;
    }
  }).join(',') + EOL;
}

function getCSVRowFromEventObject(
  event: Object,
  columns: Array<string>,
): string {
  const currentIndex = {};
  const countColumns = {};
  columns.forEach(col => countColumns[col] = (countColumns[col] || 0) + 1);
  return columns.map(column => {
    const path = column.split('.');
    let value: any = event;
    path.forEach(p => value = value != null ? value[p] : null);

    const index = currentIndex[column] || 0;
    currentIndex[column] = index + 1;

    if (countColumns[column] > 1) {
      // multiple occurences, such as multiple emails, we get the i-th element.
      if (Array.isArray(value)) {
        value = value[index];
      } else {
        // if normalizer returns single value, use it for the first value.
        value = index === 0 ? value : null;
      }
    }

    if (value == null) {
      return '';
    }
    // For content_ids, we'll need to stringify it differntly if it's
    // normalized into an array.
    if (column === 'content_ids' && Array.isArray(value)) {
      value = value.map(v => String(v)).join(',');
    } else if (column === 'catalog_auto_population_info') {
      value = JSON.stringify(value);
    } else {
      value = String(value);
    }

    // Escape quotes for CSV.
    if (value.includes('"') || value.includes(',') || value.includes('\n')) {
      return `"${String(value).replace(/\"/g, '""')}"`;
    } else {
      return value;
    }
  }).join(',') + EOL;
}

// Returns a pseudo batch sender, instead of sending data to Facebook server,
// it dumps preprocessed data to a local file.
function getPseudoBatchSenderForPreprocessing(
  outputPath: string,
  mappings: Object,
  customTypeInfo: {[string]: {baseType: string}},
  presetValues: {event_name?: ?string, currency?: ?string},
): {
  fd: number,
  sender: BatchSender,
} {
  const columns = getColumnsFromMappingsForOfflineEvents(
    mappings,
    presetValues,
  );
  const header = getHeaderFromColumns(columns, customTypeInfo);

  const fd = fs.openSync(outputPath, 'w');
  fs.appendFileSync(fd, header);

  const sender = batch => {
    return new Promise((resolve, reject) => {
      const rows = batch.rows
        .map(row => getCSVRowFromEventObject(row, columns))
        .join('');
      fs.appendFile(fd, rows, error => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  };
  return {fd, sender};
}

// Ignore error of progress overlapping.
// This typically happens when the event batch reaches the server, but
// the ACK response from server is dropped. In this case, the uploader library
// will assume that the server did not received the batch and resend.
// The server detects that the batch was actually received by checking the
// progress range, so it response with this specific error code.
// When client gets this error, it now understands that the batch has already
// arrived server so it can safely ignore the error and move forward.
function shouldIgnoreAPIErrorFn(error: {error_subcode: number}): boolean {
  return error && error.error_subcode === ERROR_CODE_PROGRESS_OVERLAP;
}

module.exports = {
  getColumnsFromMappingsForCustomAudience,
  getCustomAudienceBatchSender,
  getColumnsFromMappingsForOfflineEvents,
  getOfflineEventsBatchSender,
  getPseudoBatchSenderForPreprocessing,
  setupE2E,
  shouldIgnoreAPIErrorFn,
};
