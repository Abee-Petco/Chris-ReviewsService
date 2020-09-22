const path = require('path');
const pgdb = require('../../db/models');

const controllers = {
  averageReviews: {
    get: (req, res) => {
      const { itemId } = req.params;
      if (itemId.includes('array')) {
        const itemsInArray = itemId.substring(5);
        const itemIds = itemsInArray.split(',');
        const itemNumIds = itemIds.map((id) => +id);

        pgdb
          .getItemsByIds(itemNumIds)
          .then((data) => {
            if (data) {
              res.status(200).send(data);
            } else {
              res.status(404).send('Items do not exist');
            }
          })
          .catch((err) => {
            res.status(500).send(err);
            console.log(err);
          });
      } else {
        pgdb
          .getItemById(itemId)
          .then((data) => {
            if (data) {
              const numberOfReviews = data[0].number_of_reviews;
              const reviewAverage = `${data[0].review_average}`;

              res.status(200).send({ reviewAverage, numberOfReviews });
            } else {
              res.status(404).send('Item does not exist');
            }
          })
          .catch((err) => {
            res.status(500).send(err);
            console.log(err);
          });
      }
    }
  },

  reviews: {
    get: (req, res) => {
      const { itemId } = req.params;
      const reviewsByItemId = {};

      pgdb
        .getReviewsByItemId(itemId)
        .then((data) => {
          if (data) {
            reviewsByItemId.allReviews = data;
            return reviewsByItemId;
          }
          res.status(404).send('Item does not exist');
          return false;
        })
        .then((data) => {
          if (data) {
            pgdb.getItemById(itemId).then((result) => {
              reviewsByItemId.reviewAverage = `${result[0].review_average}`;
              reviewsByItemId.numberOfReviews = result[0].number_of_reviews;
              res.status(200).send(reviewsByItemId);
            });
          }
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    },
    post: (req, res) => {
      pgdb
        .addReview(req.body)
        .then((data) => {
          res.status(201).send(`success, new review ID: ${data}`);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    },
    put: (req, res) => {
      const id = req.params.reviewId;

      pgdb
        .updateReview(req.body.review, id)
        .then((result) => {
          res.status(200).send(result);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    },
    delete: (req, res) => {
      pgdb
        .deleteReview(req.params.reviewId)
        .then((result) => {
          res.status(200).send(result);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    }
  },

  product: {
    get: (req, res) => {
      console.log('recieved');
      const itemID = req.query.itemID;
      const itemIdNumber = Number.parseInt(itemID, 10);
      console.log(itemIdNumber);

      if (itemIdNumber < 100 || itemIdNumber > 10000100 || itemIdNumber === undefined) {
        res.status(404).send('itemId invalid');
      } else {
        res.sendFile(path.join(__dirname, '../../client/public/index.html'));
      }
    }
  }
};

module.exports = controllers;
