// @flow
export type ValidationError = {|
  row: number,
  column: string,
  invalid_value: any,
|};

const RULES = {
  'event_name': value => value.length > 0,

  'event_time': value => {
    // event_time cannot be in the future or older that 7 days.
    const date7DaysAgo = new Date();
    date7DaysAgo.setDate(date7DaysAgo.getDate()-7);
    const dateNow = new Date();
    return (date7DaysAgo.getTime()/1000) < value && value < (dateNow.getTime()/1000);
  },
  
  'event_source_url': value => true,
  
  'user.email': value => {
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(value);
  },
  
  'user.phone': value => true,
  
  'user.gender': value => value === 'm' || value === 'f',
 
  'user.date_of_birth': value => {
    // YYYYMMDD
    const re = /[0-9]{8}/i; 
    return re.test(value);
  },
 
  'user.first_name': value => true,
 
  'user.last_name': value => true,
 
  'user.city': value => true,
 
  'user.state': value => true,
 
  'user.zip_code': value => true,
 
  'user.external_id': value => true,
 
  'user.client_ip_address': value => {
    let blocks = value.split('.');
    if (blocks.length != 4)
      return false;
    for (let block of blocks) {
      if (block < 0 || 255 < block)
        return false;
    }
    return true;
  },
 
  'user.client_user_agent': value => true,
 
  'user.fbc': value => true,
 
  'user.fbp': value => true,
 
  'user.subscription_id': value => true,
 
  'custom.value': value => value >= 0,
 
  'custom.currency': value => true,
 
  'custom.content_name': value => true,
 
  'custom.content_category': value => true,
 
  'custom.content_type': value => ['product', 'product_group'].includes(value),
 
  'custom.order_id': value => true,
 
  'custom.predicted_ltv': value => value >= 0,
 
  'custom.num_items': value => value >= 0,
 
  'custom.search_string': value => true,
 
  'custom.status': value => true,
}

function getValidationErrors(rowNumber: number, row: any): Array<ValidationError> {
  let rowErrors = [];
  for (let [key, value] of Object.entries(row)) {
    if (typeof value === 'string')
      value = value.toLowerCase().trim();
    
    const hasValidationRule = RULES.hasOwnProperty(key);
    const isValid = RULES[key];
    if (hasValidationRule && !isValid(value)) { // fields with no validation rule are accepted
      rowErrors.push({
        row: rowNumber,
        column: key.toString(),
        invalid_value: value,
      });
    }
  }
  return rowErrors;
}

module.exports = {
  getValidationErrors
};