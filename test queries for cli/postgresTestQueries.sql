-- find a review by review_id
EXPLAIN
(ANALYZE true, VERBOSE FALSE, FORMAT TEXT, TIMING true)
SELECT reviews.*, users.username, yeses_noes.yeses, yeses_noes.noes
FROM reviews
LEFT OUTER JOIN users
ON (users.user_id = reviews.user_id_users)
LEFT OUTER JOIN yeses_noes
ON (yeses_noes.review_id_reviews = reviews.review_id)
WHERE reviews.review_id = 29532975;

-- find reviews associated with a specific item_id
EXPLAIN
(ANALYZE true, VERBOSE FALSE, FORMAT JSON, TIMING true)
SELECT reviews.*, users.username, yeses_noes.yeses, yeses_noes.noes
FROM reviews
LEFT OUTER JOIN users
ON (users.user_id = reviews.user_id_users)
LEFT OUTER JOIN yeses_noes
ON (review_id_reviews = reviews.review_id)
WHERE item_id_items = 9628563;

-- find average review, number of reviews, id for each review for specific item_id
EXPLAIN
(ANALYZE true, VERBOSE FALSE, FORMAT TEXT, TIMING true)
SELECT items.item_id, items.number_of_reviews, items.review_average, reviews.review_id
FROM items
LEFT OUTER JOIN reviews
ON (reviews.item_id_items = items.item_id)
WHERE items.item_id = 9476396;

-- find average review, number of reviews, id for each review for an array of item_id's
EXPLAIN
(ANALYZE true, VERBOSE FALSE, FORMAT JSON, TIMING true)
SELECT items.item_id, items.number_of_reviews, items.review_average, reviews.review_id
FROM items
LEFT OUTER JOIN reviews
ON (reviews.item_id_items = items.item_id)
WHERE items.item_id
IN (9835492, 9539246, 9666666, 9333856, 9987654);
