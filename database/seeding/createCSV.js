const fs = require('fs');
const Faker = require('faker');

const stream = fs.createWriteStream('./database/seed.csv');
stream.write('city,zipcode,_id\n');

for (let i = 1; i < 10000001; i++) {
  stream.write(`${Faker.address.city()},${Faker.address.zipCode().substring(0, 5)},${i}\n`);
}
stream.end();
