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
const findAll = (cb) => {
  pool.query('SEARCH * FROM reviews WHERE ', (err, data) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};
const create = (obj, cb) => {
  pool.query(`INSERT INTO reviews ${obj}`, (err, data) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};

const incHelpfulCounter = () => {

};

const findByDestination = (destination, cb) => {
  const review = { destination };
  pool.query(`SEARCH destination ${review}`, (err, data) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};

const remove = (cb) => {
  pool.query('', (err, data) => {
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
  findByDestination,
  remove,
};
