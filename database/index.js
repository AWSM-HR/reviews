/* eslint-disable no-console */
// const mongoose = require('mongoose');
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'Alec',
  database: 'reviews',
  password: '',
  port: 5432,
});

module.exports = {
  pool: () => pool,
};
