require('dotenv').config();
const { Pool } = require('pg');
const supertest = require('supertest');
const app = require('../../server/index.js');
const request = supertest(app);
let pool;

describe('root path', () => {
  it('should respond successfully to GET request', () => {
    return request.get('/').then((response) => {
      expect(response.statusCode).toBe(200);
    });
  });
});

describe('GET route /reviews/:product_id', () => {
  it('should respond successfully to GET request', () => {
    return request.get('/reviews/125').then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('reviewAverage');
      expect(response.body).toHaveProperty('numberOfReviews');
      expect(response.body).toHaveProperty('allReviews');
      expect(typeof +response.body.allReviews[0].reviewAverage).toBe('number');
      expect(response.body.allReviews[0]).toHaveProperty('date');
      expect(typeof response.body.allReviews[0].date).toBe('string');
      expect(response.body.allReviews[0]).toHaveProperty('title');
      expect(response.body.allReviews[0]).toHaveProperty('review');
      expect(response.body.allReviews[0]).toHaveProperty('username');
      expect(response.body.allReviews[0]).toHaveProperty('recommended');
      expect(response.body.allReviews[0]).toHaveProperty('yeses');
      expect(response.body.allReviews[0]).toHaveProperty('noes');
      expect(response.body.allReviews[0]).toHaveProperty('promotion');
    });
  });
});

describe('POST route /reviews', () => {
  const newReview = {
    score: 1,
    date: '2018-14-29T05:20:11.603Z',
    title: 'New POSTed Review',
    review:
      'Nostrud fugiat aute excepteur mollit adipisicing quis aliquip. Nisi aliquip culpa. Fugiat sint nulla duis minim nulla. Deserunt Lorem occaecat ipsum aliqua ut aliquip nostrud exercitation deserunt.',
    recommended: false,
    promotion: true,
    user_id_users: 946375,
    item_id_items: 947
  };

  const newReview2 = {
    score: 4,
    date: '2018-02-18T20:20:00.603Z',
    title: 'Next new POSTed Review',
    review: 'Sint consectetur dolor cupidatat. Ad nulla adipisicing nulla sint. Velit sint ea.',
    recommended: true,
    promotion: false,
    user_id_users: 946,
    item_id_items: 94734
  };

  it('Successfully adds review to the database', () => {
    return request
      .post('/reviews')
      .send(newReview)
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.text).toContain('success, new review ID:');
        return +response.body.reviewId;
      })
      .then((initialReviewId) => {
        return request
          .post('/reviews')
          .send(newReview2)
          .then((response2) => {
            expect(+response2.body.reviewId).toEqual(initialReviewId + 1);
          });
      });
  });
});

describe('PUT route /reviews/:reviewId', () => {
  const reviewToPostThenUpdate = {
    score: 1,
    date: '2018-14-29T05:20:11.603Z',
    title: 'New POSTed Review To Update',
    review:
      'Nostrud fugiat aute excepteur mollit adipisicing quis aliquip. Nisi aliquip culpa. Fugiat sint nulla duis minim nulla. Deserunt Lorem occaecat ipsum aliqua ut aliquip nostrud exercitation deserunt.',
    recommended: false,
    promotion: true,
    user_id_users: 948,
    item_id_items: 9473
  };
  it('Successfully updates a review using the reviewId of existing Review', () => {
    return request
      .post('/reviews')
      .send(reviewToPostThenUpdate)
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.text).toContain('success, new review ID:');

        return response.headers.reviewid;
      })
      .then((existingReviewId) => {
        return request
          .put(`/reviews/${existingReviewId}`)
          .send({ review: 'I was Updated' })
          .then((response) => {
            expect(response.statusCode).toBe(200);
            expect(typeof +existingReviewId).toBe('number');
            expect(response.body.review).toBe('I was Updated');
          });
      });
  });
});

describe('DELETE route reviews/:reviewId', () => {
  const reviewToPostThenDelete = {
    score: 1,
    date: '2018-14-29T05:20:11.603Z',
    title: 'New POSTed Review To Delete',
    review:
      'Nostrud fugiat aute excepteur mollit adipisicing quis aliquip. Nisi aliquip culpa. Fugiat sint nulla duis minim nulla. Deserunt Lorem occaecat ipsum aliqua ut aliquip nostrud exercitation deserunt.',
    recommended: false,
    promotion: true,
    user_id_users: 949,
    item_id_items: 9474
  };

  it('successfully DELETES a review of specified reviewId', () => {
    return request
      .post('/reviews')
      .send(reviewToPostThenDelete)
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.text).toContain('success, new review ID:');

        return response.headers.reviewid;
      })
      .then((existingReviewId) => {
        return request.delete(`/reviews/${existingReviewId}`).then((response) => {
          expect(response.statusCode).toBe(200);
          expect(response.body.DELETE).toBe(1);
        });
      });
  });
});
