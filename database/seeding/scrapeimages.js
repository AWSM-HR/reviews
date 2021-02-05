const axios = require('axios');
const fs = require('fs');
const https = require('https');
const path = require('path');
const auth = require('./unsplashConfig.js');
// Node.js Function to save image from External URL.
function saveImageToDisk(url, localPath) {
  const file = fs.createWriteStream(localPath);
  // eslint-disable-next-line no-unused-vars
  const request = https.get(url, (response) => {
    response.pipe(file);
  });
}
const searchAndSaveUnsplash = (searchTerm, qty, pg) => {
  const unsplashURL = `https://api.unsplash.com/search/photos?page=${pg}&per_page=${qty}&query=${searchTerm}&client_id=${auth}`;
  axios.get(unsplashURL)
    .then(({ data }) => {
      data.results.forEach((result, i) => {
        saveImageToDisk(result.urls.regular, path.resolve(__dirname, `thailandPics/tripadvisor_thailand_${i + 1 + (pg - 1) * qty}.jpg`));
      });
    })
    .catch((err) => { throw err; });
};
for (let i = 1; i < 35; i++) {
  searchAndSaveUnsplash('thailand', 30, i);
}
