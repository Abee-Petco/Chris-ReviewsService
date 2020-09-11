const { Pool } = require('pg');

const pool = new Pool({
  user: 'chrish',
  password: 'penguin',
  host: '127.0.0.1',
  database: 'petco_reviews'
});

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

const getReviewsByItemId = (itemId) => {
  pool
    .query(reviewsByItemIdQuery, [itemId])
    .then((result) => {
      console.log(result.rows);
      pool.end();
      return result.rows;
    })
    .catch((err) => {
      throw err;
    });
};

const getItemById = (itemId) => {
  pool
    .query(itemByItemIdQuery, [itemId])
    .then((result) => {
      console.log(result.rows);
      pool.end();
      return result.rows;
    })
    .catch((err) => {
      throw err;
    });
};

const getItemsByIds = (arr) => {
  pool
    .query(itemsByItemIdsQuery, [arr])
    .then((result) => {
      console.log(result.rows);
      pool.end();
      return result.rows;
    })
    .catch((err) => {
      throw err;
    });
};

getItemsByIds([345, 346, 347, 349]);

module.exports.getReviewsByItemId = getReviewsByItemId;
module.exports.getItemById = getItemById;
module.exports.getItemsByIds = getItemsByIds;
