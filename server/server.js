require('newrelic');
const createServer = require('./createServer');

const port = 3004;
createServer('reviews').listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', port);
});
