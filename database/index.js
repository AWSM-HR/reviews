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

const findAll = (id, cb) => {
  pool.query(`SELECT * FROM review WHERE destination = ${id}`, (err, { rows }) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, rows);
    }
  });
};
const create = (arr, cb) => {
  const query = 'INSERT INTO review (userName, profilePic, created_at, userHomeLocation, images, starRating, reviewTitle, reviewBody, dateOfExperience, helpfulVotes, destination, language, travelerType) VALUES($1, $13, $11, $4, $9, $5, $2, $3, $7, $12, $8, $10, $6)';
  pool.query(query, arr, (err, data) => {
    if (err) {
      console.log(err);
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};

const incHelpfulCounter = (destId, userName, cb) => {
  pool.query(`UPDATE review SET helpfulVotes = helpfulVotes + 1 WHERE userName = '${userName}' AND destination = ${destId}`, (err, data) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};

const remove = (destId, userName, cb) => {
  pool.query(`DELETE FROM review WHERE userName = '${userName} AND destination = '${destId}'`, (err, data) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};

module.exports = {
  pool,
  findAll,
  create,
  incHelpfulCounter,
  // findByDestination,
  remove,
};
