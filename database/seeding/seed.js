/* eslint-disable max-len */
/* eslint-disable spaced-comment */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'Alec',
  database: 'reviews',
  password: '',
  port: 5432,
});

const createDestinationTable = `CREATE TABLE IF NOT EXISTS destination (
  city TEXT,
  zipcode TEXT,
  _id TEXT
)`;

const createReviewsTable = `CREATE TABLE IF NOT EXISTS review (
  userName TEXT,
  profilePic TEXT,
  created_at DATE DEFAULT CURRENT_DATE,
  userHomeLocation TEXT,
  images TEXT[],
  starRating INTEGER,
  reviewTitle TEXT,
  reviewBody TEXT,
  dateOfExperience DATE,
  helpfulVotes INTEGER,
  destination TEXT,
  language TEXT,
  travelerType TEXT[]
)`;

pool.connect((err, client, done) => {
  client.query('DROP TABLE IF EXISTS destination')
    .then(() => client.query('DROP TABLE IF EXISTS review'))
    .then(() => client.query(createDestinationTable))
    .then(() => client.query(createReviewsTable))
    .then(done)
    .catch((error) => {
      console.log(error);
    });
});

// const csvStream = fastCsv
//   .parse()
//   .on('data', (row) => {
//     data.push(row);
//   })
//   .on('end', () => {
//     data.shift();

//     const pool = new Pool({
//       host: 'localhost',
//       user: 'Alec',
//       database: 'reviews',
//       password: '',
//       port: 5432,
//     });

//     const createDestinationTable = `CREATE TABLE IF NOT EXISTS destination (
//       city TEXT,
//       zipcode TEXT PRIMARY KEY
//       _id INTEGER
//     )`;

//     const createReviewsTable = `CREATE TABLE IF NOT EXISTS review (
//       userName TEXT,
//       profilePic TEXT,
//       created_at DATE DEFAULT CURRENT_DATE,
//       userHomeLocation TEXT,
//       images TEXT[],
//       starRating INTEGER,
//       reviewTitle TEXT,
//       reviewBody TEXT,
//       dateOfExperience DATE,
//       helpfulVotes INTEGER,
//       destination TEXT REFERENCES destination(zipcode),
//       language TEXT,
//       travelerType TEXT[]
//     )`;

//     const query = 'INSERT INTO destination (city, zipcode, _id) VALUES ($1 $2 $3)';

//     pool.connect((err, client, done) => {
//       client.query('DROP TABLE IF EXISTS destination')
//         .then(() => client.query('DROP TABLE IF EXISTS review'))
//         .then(() => client.query(createDestinationTable))
//         .then(() => client.query(createReviewsTable))
//         .then(() => {
//           data.forEach((row) => {
//             client.query(query, row, (error) => {
//               if (error) {
//                 console.log(error);
//               }
//             });
//           });
//           done();
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     });
//   });
// stream.pipe(csvStream);

// const Faker = require('faker');
// const fetch = require('node-fetch');
// const mongoose = require('mongoose');
// const Reviews = require('../Reviews.js');
// const db = require('../index');
// const reviewsByLanguage = require('./sampleData.js');

// const generateData = () => {
//   db('reviews');
//   fetch('https://randomuser.me/api/?results=5000')
//     .then((response) => response.json())
//     .then((fakeUsers) => {
//       Reviews.remove((err) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log('Database dropped');
//         }
//       });
//       const dummyData = [];
//       const destinations = ['Phitsanulok', 'Bangkok', 'Phuket', 'Trang', 'Ayutthaya'];
//       const languages = ['english', 'italian', 'spanish', 'french', 'russian'];
//       const travelerTypes = ['families', 'couples', 'solo', 'business', 'friends'];
//       for (let j = 0; j < destinations.length; j++) {
//         for (let i = 0; i < 100; i += 1) {
//           const randomImages = [];
//           for (let k = 0; k < Math.floor(Math.random() * 6); k++) {
//             randomImages.push(`http://d20lp9tw1uk7y6.cloudfront.net/images/tripadvisor_thailand_${Math.floor(Math.random() * 100)}.jpg`);
//           }
//           const randomTravelerTypes = [];
//           for (let type = 0; type < Math.floor(Math.random() * (6 - 1) + 1); type++) {
//             randomTravelerTypes.push(travelerTypes[type]);
//           }
//           const currentLanguage = reviewsByLanguage[languages[j]];
//           //google translate is limited to 3900 characters so my foreign language reviews
//           //are kind of small so i will add 2 random review bodys together to make a single
//           //random review body, i this change will showcase the review filtering better by preventing
//           //exact duplicate review bodies
//           const fakeReviewBody = currentLanguage[Math.floor(Math.random() * currentLanguage.length)] + currentLanguage[Math.floor(Math.random() * currentLanguage.length)];
//           const dummyReview = {
//             userName: `${Faker.name.firstName()} ${Faker.name.lastName()}`,
//             profilePic: `${fakeUsers.results[Math.floor(Math.random() * 5000)].picture.thumbnail}`,
//             created_at: Faker.date.past(),
//             userHomeLocation: Faker.address.country(),
//             images: randomImages,
//             starRating: Math.floor(Math.random() * (6 - 1) + 1),
//             reviewTitle: Faker.lorem.words(),
//             reviewBody: fakeReviewBody,
//             dateOfExperience: Faker.date.past(),
//             helpfulVotes: Math.floor(Math.random() * (20 - 1) + 1),
//             destination: destinations[j],
//             language: languages[j],
//             travelerType: randomTravelerTypes,
//           };
//           dummyData.push(dummyReview);
//           console.log('Dummy Review', dummyReview.userName);
//         }
//       }

//       Reviews.create(dummyData, (err) => {
//         if (err) {
//           console.log('Err', err);
//           mongoose.disconnect();
//         } else {
//           console.log('Seeding complete');
//           mongoose.disconnect();
//         }
//       });
//     })
//     .catch((err) => console.log(err));
// };

// generateData();
