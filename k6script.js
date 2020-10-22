import { check, sleep } from 'k6';
import http from 'k6/http';
// import idStrings from './k6RandomIds.js';

/*export const options = {
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

// Post new review stress test script below
export default function () {
  const headers = { 'Content-Type': 'application/json' };
  const newReview = {
    score: 5,
    date: '2020-03-15T22: 07: 57.603Z',
    title: 'massa vulputate bibendum auctor',
    review:
      'Suspendisse bibendum lectus sit amet ante auctor consequat. Sed malesuada urna erat, tempus sollicitudin augue porttitor sit amet. Duis viverra.',
    recommended: true,
    promotion: true,
    user_id_users: 947586,
    item_id_items: 946375
  };
  const res = http.post(`http://127.0.0.1:3001/reviews`, newReview, headers);

  check(res, {
    'is status 201': (r) => {
      return r.status === 201;
    }
  });
  sleep(1);
}

// Variations for different routes

// before cache below GET averageReviewsByItemId
// export default function () {
//   const res = http.post(`http://127.0.0.1:3001/averageReviews/${Math.ceil(Math.random() * 10000000 + 100)}`);

//   check(res, {
//     'is status 200': (r) => {
//       return r.status === 200;
//     }
//   });
//   sleep(1);
// }

// after cache below GET averageReviewsByItemId
// export default function () {
//   const res = http.post(`http://127.0.0.1:3001/averageReviews/${Math.ceil(Math.random() * 1000 + 9999100)}`);

//   check(res, {
//     'is status 200': (r) => {
//       return r.status === 200;
//     }
//   });
//   sleep(1);
// }

// before and after cache below GET averageReviewsByItemIds
// export default function () {
//  const res = http.post(`http://127.0.0.1:3001/averageReviews/array${idStrings[Math.floor(Math.random() * 1000)]}`);

//  check(res, {
//    'is status 200': (r) => {
//     return r.status === 200;
//    }
//  });
//    sleep(1);
//  }

// before cache below - GET reviewsByItemId
// export default function () {
//   const res = http.post(
//     `http://127.0.0.1:3001/reviews/${Math.ceil(Math.random() * 10000000 +100)}`
//   );

//   check(res, {
//     'is status 201': (r) => {
//       return r.status === 201;
//     }
//   });
//   sleep(1);
// }

// after cache below GET reviwsByItemId
// export default function () {
//   const res = http.post(
//     `http://127.0.0.1:3001/reviews/${Math.ceil(Math.random() * 1000 + 9999100)}`
//   );

//   check(res, {
//     'is status 201': (r) => {
//       return r.status === 201;
//     }
//   });
//   sleep(1);
// }*/
export default function () {
  const res = http.get(
    `http://ec2-18-191-202-18.us-east-2.compute.amazonaws.com/reviews/${Math.ceil(
      Math.random() * 1000000 + 9000000
    )}`
  );
  check(res, {
    'is status 200': (r) => {
      return r.status === 200;
    }
  });
  sleep(1);
}
