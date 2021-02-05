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

// const db = (database) => (
//   mongoose.connect(`mongodb://localhost:27017/${database}`, { useNewUrlParser: true }, { useUnifiedTopology: true })
//     .then(() => console.log('Connected to MONGODB'))
//     .catch((err) => console.log(err))
// );
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
  const query = 'INSERT INTO review (userName, profilePic, created_at, userHomeLocation, images, starRating, reviewTitle, reviewBody, dateOfExperience, helpfulVotes, destination) VALUES($1, $2, $10, $3, $4, $5, $6, $7, $8, $11, $9)';
  pool.query(query, arr, (err, data) => {
    if (err) {
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

// Look into front end how this is implemented
// const findByDestination = (destination, cb) => {
//   const review = { destination };
//   pool.query(`SEARCH destination ${review}`, (err, data) => {
//     if (err) {
//       cb(err, null);
//     } else {
//       cb(null, data);
//     }
//   });
// };

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
