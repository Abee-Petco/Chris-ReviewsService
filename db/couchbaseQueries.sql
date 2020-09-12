-- find a review by review_id
SELECT * FROM IndividualReviews USE KEYS 'key::27983461';

-- find reviews corresponding to an array of reviewId's'
SELECT *
FROM IndividualReviews
USE KEYS ['key::29834612', 'key::29649265', 'key::29297864', 'key::29649843', 'key::29934524'];

-- find average review, number of reviews, id and allReviews for each review for specific item_id
SELECT *
FROM AggregateReviews
USE KEYS 'key::9876543';


-- find average review, number of reviews, id, allReviews for each review for an array of item_id's
SELECT *
FROM AggregateReviews
USE KEYS ['key::9834612', 'key::9649265', 'key::9297864', 'key::9649843', 'key::9934524'];


-- ADD a review
INSERT INTO `IndividualReviews` (KEY, VALUE)
VALUES ('key::30000505', {
    "date": '2019-12-06T22:07:57.603Z',
    "itemId": 8723456,
    "noes": 0,
    "promotion": false,
    "recommended": true,
    "review":
      'Aenean semper nunc ac consectetur vestibulum. Morbi et quam placerat, tincidunt lectus in, aliquam sapien. Fusce ultrices nibh in sapien imperdiet, nec semper urna consectetur. Proin accumsan nec mauris ac vehicula. In hac habitasse platea.',
    "reviewId": 30000505,
    "score": 5,
    "title": 'Ut vestibulum',
    "username": 'NotACatLady',
    "verified": true,
    "yeses": 5
  })
  RETURNING META().id;

  -- DELETE a review
  DELETE FROM IndividualReviews
  USE KEYS 'key::30000505'
  RETURNING *;

  -- UPDATE a review
  UPDATE `IndividualReviews`
  USE KEYS 'key::30000505'
  SET review = 'Just so so'
  RETURNING `IndividualReviews`.review;