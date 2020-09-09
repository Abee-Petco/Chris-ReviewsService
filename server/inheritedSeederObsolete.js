// const database = require('./db.js');
// const seed = require('./seed/seed.js');

// const { AggregateReview, IndividualReview, db } = database;
// const { detailedItemReviews, detailedIndividualReviews } = seed;

// AggregateReview.findOne({ itemId: '100' })
//   .exec()
//   .then((data) => {
//     if (data) {
//       throw new Error(
//         'Error: database already seeded. If you want to reseed database, you must first drop it.'
//       );
//     }
//     return AggregateReview.create(detailedItemReviews);
//   })
//   .then(() => IndividualReview.create(detailedIndividualReviews))
//   .then(() => {
//     console.log(
//       'PTCReviewsService seeded succesfully in your MongoDB instance'
//     );
//     db.close();
//   })
//   .catch((err) => {
//     console.log(err);
//     db.close();
//   });
