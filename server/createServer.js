const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const routes = require('./reviewRoutes');
// const db = require('../database/index');

function createServer() {
  const app = express();
  app.use(express.json());
  app.use(express.static('public'));
  app.use(parser());
  app.use(cors());
  app.use('/api/reviews', routes);
  // db(dbName);
  return app;
}

module.exports = createServer;
