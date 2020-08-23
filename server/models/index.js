const database = require('../db.js');

const { IndividualReview } = database;

const addId = (document) => {
  return IndividualReview.find()
    .sort({ reviewId: -1 })
    .limit(1)
    .then((data) => {
      console.log('HighestReviewId', data[0].reviewId);
      return data[0].reviewId;
    })
    .then((highest) => {
      const docWithId = Object.assign({}, document);

      docWithId.reviewId = highest + 1;
      // console.group('newDoc', docWithId);
      return docWithId;
    });
};

const addReview = (document) => {
  return IndividualReview.create([document])
    .then((result) => {
      return result[0];
    })
    .catch((err) => {
      throw err;
    });
};

const updateReview = (id, document) => {
  return IndividualReview.findOneAndUpdate({ reviewId: id }, document, {
    new: true,
  })
    .then((result) => {
      console.log('Found and updated', result);
      return result;
    })
    .catch((err) => {
      throw err;
    });
};

module.exports.addId = addId;
module.exports.addReview = addReview;
module.exports.updateReview = updateReview;
