const program = require('commander');
 
program
  .version('0.0.1')
  .command('validate', 'Read input file and print possible errors in the data, if any.')
  .command('upload', 'Hash and send events in input file via the SSE API.')
  .parse(process.argv);