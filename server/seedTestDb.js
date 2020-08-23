const db = require('./db.js');
const {
  detailedItemReviews,
  detailedIndividualReviews,
} = require('./seed/seed.js');

const seedTestDb = () => {
  console.log(Array.isArray(detailedIndividualReviews));
  console.log(Array.isArray(detailedItemReviews));
  db.AggregateReview.create(detailedItemReviews)
    .then(() => {
      console.log(db.IndividualReview.create);
      db.IndividualReview.create(detailedIndividualReviews);
    })
    .then(() => {
      console.log('test database seeded');
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = seedTestDb;
