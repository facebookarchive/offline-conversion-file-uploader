const { getValidationErrors } = require('../src/validation');

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function correctEventTime() {
  let d = new Date();
  d = addDays(d, -1);
  return d.getTime() / 1000;
}

describe('getValidationErrors', () => {
  test('empty event_name is invalid', () => {
    const errors = getValidationErrors(1, { event_name:'', event_time: correctEventTime() });
    expect(errors).toEqual([{ row: 1, column: 'event_name', invalid_value: '' }]);
  });

  test('event_time in the future is invalid', () => {
    let d = new Date();
    d = addDays(d, 1);
    const event_time = d.getTime() / 1000;
    const errors = getValidationErrors(1, { event_name:'TestEvent', event_time });
    expect(errors).toEqual([{ row: 1, column: 'event_time', invalid_value: event_time }]);
  });

  test('event_time in the last 7 days is valid', () => {
    const errors = getValidationErrors(1, { event_name:'TestEvent', event_time: correctEventTime() });
    expect(errors).toHaveLength(0);
  });

  test('event_time older that 7 days is invalid', () => {
    let d = new Date();
    d = addDays(d, -8);
    const event_time = d.getTime() / 1000;
    const errors = getValidationErrors(1, { event_name:'TestEvent', event_time });
    expect(errors).toEqual([{ row: 1, column: 'event_time', invalid_value: event_time }]);
  });

  test('only product and product_group are valid values for content_type', () => {
    for (let v of ['product', 'product_group']) {
      let errors = getValidationErrors(1, { event_name:'TestEvent', event_time: correctEventTime(), 'custom.content_type': v });
      expect(errors).toHaveLength(0);
    }
    
    let errors = getValidationErrors(1, { event_name:'TestEvent', event_time: correctEventTime(), 'custom.content_type': 'hotel' });
    expect(errors).toEqual([{ row: 1, column: 'custom.content_type', invalid_value: 'hotel' }]);
  });
  
  test('only m or f are valid values for user.gender', () => {
    let errors = getValidationErrors(1, { event_name:'TestEvent', event_time: correctEventTime(), 'user.gender': 'f' });
    expect(errors).toHaveLength(0);
  
    errors = getValidationErrors(1, { event_name:'TestEvent', event_time: correctEventTime(), 'user.gender': 'f' });
    expect(errors).toHaveLength(0);
    
    errors = getValidationErrors(1, { event_name:'TestEvent', event_time: correctEventTime(), 'user.gender': 'female' });
    expect(errors).toEqual([{ row: 1, column: 'user.gender', invalid_value: 'female' }]);
    
    errors = getValidationErrors(1, { event_name:'TestEvent', event_time: correctEventTime(), 'user.gender': 'a' });
    expect(errors).toEqual([{ row: 1, column: 'user.gender', invalid_value: 'a' }]);
  });

  test('detects multiple errors in the same row', () => {
    const errors = getValidationErrors(1, { event_name:'TestEvent', event_time: correctEventTime(), 'user.gender': 'male', 'custom.content_type': 'hotel' });
    expect(errors).toHaveLength(2);
    expect(errors).toEqual([{ row: 1, column: 'user.gender', invalid_value: 'male' }, { row: 1, column: 'custom.content_type', invalid_value: 'hotel' }]);
  });

});