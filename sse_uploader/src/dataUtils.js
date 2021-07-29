// @flow
const crypto = require('crypto');

const SERVER_EVENT_PARAMS = ['event_name', 'event_time', 'event_source_url', 'event_id', 'action_source', 'opt_out'];

const USER_PARAMS_MAPPINGS = {
  'email': 'em',
  'phone': 'ph',
  'gender': 'ge',
  'date_of_birth': 'db',
  'first_name': 'fn',
  'last_name': 'ln',
  'city': 'ct',
  'state': 'st',
  'zip_code': 'zp',
  'external_id': 'external_id',
  'client_ip_address': 'client_ip_address',
  'client_user_agent': 'client_user_agent',
  'fbc': 'fbc',
  'fbp': 'fbp',
  'subscription_id': 'subscription_id'
};

const NON_HASHABLE = ['client_ip_address', 'client_user_agent', 'client_user_agent', 'fbc', 'fbp', 'subscription_id'];

const CUSTOM_PARAMS = ['value', 'currency', 'content_name', 'content_category', 'content_type', 'order_id', 'predicted_ltv', 'num_items', 'search_string', 'status']; // 'content_ids', 'contents' not yet there

type UserData = {
  em?: string,
  ph?: string,
  ge?: string,
  db?: string,
  fn?: string,
  ln?: string,
  ct?: string,
  st?: string,
  zp?: string,
  external_id?: string,
  client_ip_address?: string,
  client_user_agent?: string,
  fbc?: string,
  fbp?: string,
  subscription_id?: string,
};

type CustomData = {
  value?: string,
  currency?: string,
  content_name?: string,
  content_category?: string,
  content_type?: string,
  order_id?: string,
  predicted_ltv?: string,
  num_items?: string,
  search_string?: string,
  status?: string,
};

export type SSEvent = {
  event_name: string,
  event_time: number,
  event_source_url?: string,
  event_id?: string,
  user_data?: UserData,
  custom_data?: CustomData,
  opt_out?: boolean,
  action_source: string,
  data_processing_options: []
};

function getEventData(row: any): SSEvent {
  const data = {}, userData = {}, customData = {};

  // Event parameters
  for (const p of SERVER_EVENT_PARAMS) {
    if (row[p])
      data[p] = row[p];
  }

  // Custom parameters
  for (const p of CUSTOM_PARAMS) {
    if (row[`custom.${p}`])
      customData[p] = row[`custom.${p}`];
  }

  // User data parameters
  for (const p of Object.keys(USER_PARAMS_MAPPINGS)) {
    if (row[`user.${p}`]) {
      if (NON_HASHABLE.includes(p)) {
        userData[USER_PARAMS_MAPPINGS[p]] = row[`user.${p}`];
      }
      else {
        const hash = crypto.createHash('sha256');
        const pii = row[`user.${p}`].toLowerCase().trim();
        hash.update(pii);
        userData[USER_PARAMS_MAPPINGS[p]] = hash.digest('hex');
      }
    }
  }

  data.user_data = userData;
  data.custom_data = customData;
  return data;
}

function isEmptyObject(obj: any) {
  return !Object.keys(obj).length;
}

module.exports = {
  getEventData,
  isEmptyObject
};
