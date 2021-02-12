/* eslint-disable max-len */
/* eslint-disable spaced-comment */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'alec',
  database: 'reviews',
  password: 'root',
  port: 5432,
});

const createDestinationTable = `CREATE TABLE IF NOT EXISTS destination (
  city TEXT,
  zipcode TEXT,
  _id INTEGER PRIMARY KEY
)`;

const createReviewsTable = `CREATE TABLE IF NOT EXISTS review (
  userName TEXT,
  profilePic TEXT,
  created_at TEXT,
  userHomeLocation TEXT,
  images TEXT[],
  starRating INTEGER,
  reviewTitle TEXT,
  reviewBody TEXT,
  dateOfExperience TEXT,
  helpfulVotes INTEGER,
  destination INTEGER,
  language TEXT,
  travelerType TEXT[],
  FOREIGN KEY(destination)
    REFERENCES destination(_id)
)`;

pool.connect((err, client, done) => {
  client.query('DROP TABLE IF EXISTS destination CASCADE')
    .then(() => client.query('DROP TABLE IF EXISTS review CASCADE'))
    .then(() => client.query(createDestinationTable))
    .then(() => client.query(createReviewsTable))
    .then(done)
    .catch((error) => {
      console.log(error);
    });
});
