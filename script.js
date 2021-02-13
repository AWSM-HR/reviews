import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  discardResponseBodies: true,
  duration: '3m',
  vus: 1000
};

export default function () {
  // const payload = JSON.stringify({
  //   userName: 'name',
  //   reviewTitle: 'title',
  //   reviewBody: 'Body',
  //   userHomeLocation: 'United States',
  //   starRating: 5,
  //   travelerType: ['couples'],
  //   dateOfExperience: new Date(),
  //   destination: 894324,
  //   images: [],
  //   language: 'english'
  // })

  http.get(`http://localhost:3004/#/destination/${Math.ceil(Math.random() * 10000000)}`);
  sleep(1);
  // http.post(`http://localhost:3004/#/destination/${Math.ceil(Math.random() * 10000000)}`, payload);
}