/* eslint-disable no-console */
// const mongoose = require('mongoose');
const { Pool } = require('pg');

const pool = new Pool({
  host: '13.52.239.117',
  user: 'alec',
  database: 'reviews',
  password: process.env.PSQL_PWD,
  port: 5432,
});

module.exports = {
  pool: () => pool,
  // pool,
};
