const request = require('supertest');
const app = require('../../server/index.js');
const controllers = require('../../server/controller/index.js');

describe('server', () => {
  describe('root path', () => {
    it('should respond successfully to GET request', () => {
      return request(server)
        .get('/')
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
    });
  });

  describe('GET route /reviews/:product_id', () => {
    it('should respond successfully to GET request', () => {
      return request(server)
        .get('/reviews/125')
        .then((response) => {
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
          expect(response.body.allReviews[0]).toHaveProperty('verified');
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
      username: 'Ham Sandwich',
      recommended: false,
      yeses: 0,
      noes: 0,
      verified: true,
      promotion: true
    };

    const newReview2 = {
      score: 4,
      date: '2018-02-18T20:20:00.603Z',
      title: 'Next new POSTed Review',
      review: 'Sint consectetur dolor cupidatat. Ad nulla adipisicing nulla sint. Velit sint ea.',
      username: 'commodo',
      recommended: true,
      yeses: 1,
      noes: 0,
      verified: true,
      promotion: false
    };

    it('Successfully adds review to the database', () => {
      return request(server)
        .post('/reviews')
        .send(newReview)
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(response.body.title).toBe('New POSTed Review');
          return +response.body.reviewId;
        })
        .then((initialReviewId) => {
          return request(server)
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
      username: 'Ham Sandwich',
      recommended: false,
      yeses: 0,
      noes: 0,
      verified: true,
      promotion: true
    };
    it('Successfully updates a review using the reviewId of existing Review', () => {
      return request(server)
        .post('/reviews')
        .send(reviewToPostThenUpdate)
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(response.body.title).toBe('New POSTed Review To Update');

          return response.body;
        })
        .then((existingReview) => {
          return request(server)
            .put(`/reviews/${existingReview.reviewId}`)
            .send({ title: 'I was Updated' })
            .then((response) => {
              expect(response.statusCode).toBe(200);
              expect(typeof +existingReview.reviewId).toBe('number');
              expect(JSON.parse(response.text).title).toBe('I was Updated');
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
      username: 'Ham Sandwich',
      recommended: false,
      yeses: 0,
      noes: 0,
      verified: true,
      promotion: true
    };

    it('successfully DELETES a review of specified reviewId', () => {
      return request(server)
        .post('/reviews')
        .send(reviewToPostThenDelete)
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(response.body.title).toBe('New POSTed Review To Delete');

          return response.body;
        })
        .then((existingReview) => {
          return request(server)
            .delete(`/reviews/${existingReview.reviewId}`)
            .then((response) => {
              expect(response.statusCode).toBe(200);
              expect(JSON.parse(response.text).ok).toBe(1);
              expect(JSON.parse(response.text).deletedCount).toBe(1);
            });
        });
    });
  });
});
