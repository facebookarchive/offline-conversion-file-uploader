// @flow
const program = require('commander');
const csv = require('csv-parser');
const fs = require('fs');
const { AdsPixel, FacebookAdsApi } = require('facebook-nodejs-business-sdk');
const { loadConfigOrExit } = require('./configUtils');
const { getEventData, isEmptyObject } = require('./dataUtils');

import type { SSEvent } from './dataUtils';

program
  .option('-i, --input <path>', 'Input csv file path', 'events.csv')
  .option('-c, --config <path>', 'Configuration file path', 'config.json')
  .option('-t, --test-mode', 'Send test_id in parameters to test using Events Manager')
  .option('-d, --debug', 'debug mode');

program.parse(process.argv);

const COMMAND = 'upload';

async function sendEventsBatch(batch: Array<SSEvent>, pixel: any, test_id: ?string) {
  if (batch.length === 0)
    return;

  const payload = {}
  if (test_id)
    payload.test_event_code = test_id;

  payload.data = batch;
  return pixel.createEvent(null, payload);
}

function main() {
  const config = loadConfigOrExit(program.config);
  FacebookAdsApi.init(config.access_token);

  const pixel = new AdsPixel(config.pixel_id);

  const testId = program.testMode ? config.test_id : null;

  let batches = [], batch = [];
  fs.createReadStream(program.input)
      .pipe(csv())
      .on('data', data => {
        if (!isEmptyObject(data)) {
          batch.push(getEventData(data));
          if (batch.length == config.batch_size) {
            batches.push(batch);
            batch = [];
          }
        }
      })
      .on('end', async () => {
        if (batch.length > 0)
          batches.push(batch);

        // Send all batches
        const sendPromises = [];
        for (let b of batches)
          sendPromises.push(sendEventsBatch(b, pixel, testId));

        try {
          await Promise.all(sendPromises);
        } catch(err) {
          console.error(err);
        }
      });
}

main();
