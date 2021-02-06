import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 400,
      timeUnit: '1s',
      duration: '30s',
      preAllocatedVUs: 150,
      maxVUs: 230,
    },
  },
};
export default function () {
  http.get(`http://localhost:3004/#/destination/${Math.floor(Math.random() * 10000000 + 1)}`);
  sleep(1);
}