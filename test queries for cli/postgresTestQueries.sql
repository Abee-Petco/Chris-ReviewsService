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
(ANALYZE true, VERBOSE TRUE, FORMAT TEXT, TIMING true)
SELECT number_of_reviews, review_average
FROM items
WHERE item_id = 9476396;

-- find average review, number of reviews, id for each review for an array of item_id's
EXPLAIN
(ANALYZE true, VERBOSE TRUE, FORMAT TEXT, TIMING true)
SELECT item_id, number_of_reviews, review_average
FROM items
WHERE item_id
IN (9835325, 9539473, 9666111, 9333222, 9987333);

-- delete a review by review_id

EXPLAIN
(ANALYZE true, VERBOSE TRUE, FORMAT TEXT, TIMING true)
DELETE FROM reviews WHERE review_id = 30001863;


-- add a review

EXPLAIN
(ANALYZE true, VERBOSE TRUE, FORMAT TEXT, TIMING true)
WITH insert1 AS (
  INSERT INTO reviews (review_id, score, date, title, review, recommended, promotion, user_id_users, item_id_items)
  VALUES (30001858, 3, '2019-05-06T22:07:57.603Z', 'Im an inserted title', 'Absolutely terrible', 'f', 'f', 9834567, 9999993)
  RETURNING *
  ),
  insert2 AS (
    INSERT INTO yeses_noes (review_id_reviews, yeses, noes)
    VALUES((SELECT review_id FROM insert1), 3, 1)
    RETURNING *
  )
  SELECT * FROM insert2;

  -- UPDATE a review by review_id

EXPLAIN
(ANALYZE true, VERBOSE TRUE, FORMAT TEXT, TIMING true)
UPDATE reviews
SET review = 'Yeah, it is bad but not terrible'
WHERE review_id = 30001864
RETURNING *;








