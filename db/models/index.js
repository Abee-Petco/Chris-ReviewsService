/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
const pool = require('../index.js');

const itemByItemIdQuery = `
  SELECT items.item_id, items.number_of_reviews, items.review_average, reviews.review_id
  FROM items
  LEFT OUTER JOIN reviews
  ON (reviews.item_id_items = items.item_id)
  WHERE items.item_id = $1
  `;

const itemsByItemIdsQuery = `
  SELECT item_id, number_of_reviews, review_average
  FROM items
  WHERE item_id =
  ANY ($1)
`;

const reviewsByItemIdQuery = `
  SELECT reviews.*, users.username, yeses_noes.yeses, yeses_noes.noes
  FROM reviews
  LEFT OUTER JOIN users
  ON (users.user_id = reviews.user_id_users)
  LEFT OUTER JOIN yeses_noes
  ON (review_id_reviews = reviews.review_id)
  WHERE item_id_items = $1
`;

const highestReviewIdQuery = `SELECT review_id FROM reviews ORDER BY review_id DESC LIMIT 1`;

const addReviewQuery = `WITH insert1 AS (
  INSERT INTO reviews (review_id, score, date, title, review, recommended, promotion, user_id_users, item_id_items)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  RETURNING *
  ),
  insert2 AS (
    INSERT INTO yeses_noes (review_id_reviews, yeses, noes)
    VALUES((SELECT review_id FROM insert1), 3, 1)
    RETURNING *
  )
  SELECT * FROM insert1, insert2`;

const deleteReviewQuery = `DELETE FROM reviews WHERE review_id = $1`;

const updateReviewQuery = `UPDATE reviews
  SET review = $1
  WHERE review_id = $2
  RETURNING *`;

const getReviewsByItemId = (itemId) => {
  return pool
    .query(reviewsByItemIdQuery, [itemId])
    .then((result) => {
      const copy = result.rows.slice();

      copy.forEach((review) => {
        review.userId = review.user_id_users;
        review.itemId = review.item_id_items;
        review.reviewId = review.review_id;
        delete review.user_id_users;
        delete review.item_id_items;
        delete review.review_id;
      });

      return copy;
    })
    .catch((err) => {
      throw err;
    });
};

const getItemById = (itemId) => {
  return pool
    .query(itemByItemIdQuery, [itemId])
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      throw err;
    });
};

const getItemsByIds = (arr) => {
  return pool
    .query(itemsByItemIdsQuery, [arr])
    .then((result) => {
      result.rows.forEach((item) => {
        item.itemId = item.item_id;
        item.reviewAverage = item.review_average;
        item.numberOfReviews = item.number_of_reviews;
        delete item.review_average;
        delete item.number_of_reviews;
        delete item.item_id;
      });
      return result.rows;
    })
    .catch((err) => {
      throw err;
    });
};

const addReview = (document) => {
  return pool
    .query(highestReviewIdQuery)
    .then((result) => {
      const new_review_id = result.rows[0].review_id + 1;
      document.review_id = new_review_id;
      return document;
    })
    .then((data) => {
      const values = [
        data.review_id,
        data.score,
        data.date,
        data.title,
        data.review,
        data.recommended,
        data.promotion,
        data.user_id_users,
        data.item_id_items
      ];
      return pool.query(addReviewQuery, values).then((result) => {
        return result.rows;
      });
    })
    .catch((err) => {
      throw err;
    });
};

const deleteReview = (reviewId) => {
  return pool.query(deleteReviewQuery, [reviewId]).then((result) => {
    return { [result.command]: result.rowCount };
  });
};

const updateReview = (updatedReviewText, reviewId) => {
  return pool
    .query(updateReviewQuery, [updatedReviewText, reviewId])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      throw err;
    });
};

module.exports.getReviewsByItemId = getReviewsByItemId;
module.exports.getItemById = getItemById;
module.exports.getItemsByIds = getItemsByIds;
module.exports.addReview = addReview;
module.exports.deleteReview = deleteReview;
module.exports.updateReview = updateReview;
