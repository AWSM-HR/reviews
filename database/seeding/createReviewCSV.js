const fs = require('fs');
const {
  name, image, address, date, lorem,
} = require('faker');
const reviewsByLanguage = require('./sampleData.js');

const stream = fs.createWriteStream('./database/review.csv');
stream.write('userName,profilePic,created_at,userHomeLocation,images,starRating,reviewTitle,reviewBody,dateOfExperience,helpfulVotes,destination,language,travelerType\n');

const languages = ['english', 'italian', 'spanish', 'french', 'russian'];
const travelerTypes = ['families', 'couples', 'solo', 'business', 'friends'];

function createdReviews(streamer, cb) {
  let count = 0;
  function write() {
    let ok = true;
    do {
      count++;
      const numOfRevs = Math.floor(Math.random() * 6 + 5);
      for (let i = 0; i < numOfRevs; i += 1) {
        const randomImages = [];
        for (let k = 0; k < Math.floor(Math.random() * 6 + 1); k++) {
          randomImages.push(`https://reviews-sdc.s3-us-west-1.amazonaws.com/thailandPics/tripadvisor_thailand_${Math.floor(Math.random() * 1021 + 1)}.jpg`);
        }
        const randomTravelerTypes = [];
        for (let type = 0; type < Math.floor(Math.random() * 5 + 1); type++) {
          randomTravelerTypes.push(travelerTypes[type]);
        }
        const language = languages[Math.floor(Math.random() * 5)];
        const currentLanguage = reviewsByLanguage[language];
        // eslint-disable-next-line max-len
        const fakeReviewBody = currentLanguage[Math.floor(Math.random() * currentLanguage.length)] + currentLanguage[Math.floor(Math.random() * currentLanguage.length)];
        if (count === 10000000 && i === numOfRevs - 1) {
          streamer.write(`${name.firstName()} ${name.lastName()},${image.avatar()},${date.past()},"${address.country()}","{${randomImages.join(',')}}",${Math.floor(Math.random() * 5 + 1)},${lorem.words()},"${fakeReviewBody}",${date.past()},${Math.floor(Math.random() * 21)},${count.toString()},${language},"{${randomTravelerTypes.join(',')}}"\n`, 'utf-8', cb);
        }
        ok = streamer.write(`${name.firstName()} ${name.lastName()},${image.avatar()},${date.past()},"${address.country()}","{${randomImages.join(',')}}",${Math.floor(Math.random() * 5 + 1)},${lorem.words()},"${fakeReviewBody}",${date.past()},${Math.floor(Math.random() * 21)},${count},${language},"{${randomTravelerTypes.join(',')}}"\n`, 'utf-8');
      }
    } while (count < 10000000 && ok);
    if (count < 10000000) {
      streamer.once('drain', write);
    }
  }
  write();
}

createdReviews(stream, () => stream.end());
