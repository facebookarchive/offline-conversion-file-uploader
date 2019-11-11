// @flow
const program = require('commander');
const csv = require('csv-parser');
const fs = require('fs');
const { loadConfigOrExit } = require('./configUtils');
const { getValidationErrors } = require('./validation');

import type { ValidationError } from './validation';

program
  .option('-i, --input <path>', 'Input csv file path', 'events.csv')

program.parse(process.argv);

const COMMAND = 'validate';

function printErrors(errors) {
  for (let i = 0; i < errors.length; i++) {
    let e = errors[i];
    console.log(`   Row ${e.row} - Invalid value '${e.invalid_value}' in '${e.column}'.`)
  }
}

function main() {
  let errors = [];
  let rowNumber = 1;
  fs.createReadStream(program.input)
      .pipe(csv())
      .on('data', data => {
        let rowErrors = getValidationErrors(rowNumber, data);
        errors = errors.concat(rowErrors);
        rowNumber++;
      })
      .on('end', async () => {
        if (errors.length) {
          console.log('Errors found:')
          printErrors(errors);
        } else {
          console.log('No errors found');
        }
      });
}

main();
