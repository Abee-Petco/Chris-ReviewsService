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