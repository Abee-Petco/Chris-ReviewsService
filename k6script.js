import { check, sleep } from 'k6';
import http from 'k6/http';
import idStrings from './k6RandomIds.js';

export const options = {
  stages: [
    { duration: '2m', target: 1 }, // below normal load
    { duration: '5m', target: 1 },
    { duration: '2m', target: 10 }, // normal load
    { duration: '5m', target: 10 },
    { duration: '2m', target: 100 }, // around the breaking point
    { duration: '5m', target: 100 },
    { duration: '2m', target: 1000 }, // beyond the breaking point
    { duration: '5m', target: 1000 },
    { duration: '10m', target: 0 } // scale down. Recovery stage.
  ]
};

export default function () {
  const headers = { 'Content-Type': 'application/json' };
  const newReview = JSON.stringify({
    score: 5,
    date: '2020-03-15T22: 07: 57.603Z',
    title: 'massa vulputate bibendum auctor',
    review:
      'Suspendisse bibendum lectus sit amet ante auctor consequat. Sed malesuada urna erat, tempus sollicitudin augue porttitor sit amet. Duis viverra.',
    recommended: true,
    promotion: true,
    user_id_users: 947586,
    item_id_items: 946375
  });
  const res = http.post(`http://127.0.0.1:3001/reviews`, newReview, { headers: headers });
  check(res, {
    'is status 201': (r) => {
      // console.log('STATUS', r.body);
      return r.status === 201;
    }
  });
  sleep(1);
}
