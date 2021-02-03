const fs = require('fs');
const Faker = require('faker');
const reviewsByLanguage = require('./seeding/sampleData.js');

const stream = fs.createWriteStream('./database/review.csv');
stream.write('userName,profilePic,created_at,userHomeLocation,images,starRating,reviewTitle,reviewBody,dateOfExperience,helpfulVotes,destination,language,travelerType\n');

const languages = ['english', 'italian', 'spanish', 'french', 'russian'];
const travelerTypes = ['families', 'couples', 'solo', 'business', 'friends'];
for (let j = 1; j < 100; j++) {
  for (let i = 0; i < (Math.floor(Math.random() * 6 + 5)); i += 1) {
    const randomImages = [];
    for (let k = 0; k < Math.floor(Math.random() * 6 + 1); k++) {
      randomImages.push(`http://d20lp9tw1uk7y6.cloudfront.net/images/tripadvisor_thailand_${Math.floor(Math.random() * 100)}.jpg`);
    }
    const randomTravelerTypes = [];
    for (let type = 0; type < Math.floor(Math.random() * 5 + 1); type++) {
      randomTravelerTypes.push(travelerTypes[type]);
    }
    const language = languages[Math.floor(Math.random() * 5)];
    const currentLanguage = reviewsByLanguage[language];

    // eslint-disable-next-line max-len
    const fakeReviewBody = currentLanguage[Math.floor(Math.random() * currentLanguage.length)] + currentLanguage[Math.floor(Math.random() * currentLanguage.length)];
    const firstName = Faker.name.firstName();
    const lastName = Faker.name.lastName();
    const profilePic = '';
    const createdAt = Faker.date.past();
    const userHome = Faker.address.country();
    const starRating = Math.floor(Math.random() * 5 + 1);
    const reviewTitle = Faker.lorem.words();
    const dateOfExperience = Faker.date.past();
    const helpfulVotes = Math.floor(Math.random() * 21);
    const destination = j;
    stream.write(`${firstName} ${lastName},${profilePic},${createdAt},${userHome},${randomImages},${starRating},${reviewTitle},${fakeReviewBody},${dateOfExperience},${helpfulVotes},${destination},${language},${randomTravelerTypes}\n`);
  }
}
// TODO: Figure out array situation
stream.end();
