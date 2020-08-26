# CRUD implementation, RESTful

## GET (inherited)

Endpoint: /averageReviews/:itemId

Server Response:
{
reviewAverage: “String between 0-5 representing average number of stars for that item”,
numberOfReviews: “Integer number representing number of reviews for that item”
}

UNLESS the itemId is in the form: array,number,number,number where "number" is greater than or equal to 100. array is literally the string 'array'

THEN server response:

An array filled with objects. Each object is the object that would normally return, but with the additional property "itemId"

Endpoint: /reviews/:itemId

Server Response:
{
reviewAverage: “String representing float number between 0-5 representing average number of stars for that item”,
numberOfReviews: “Integer number representing number of reviews for that item”,
allReviews: [array filled with “individual review object”s],
}

“Individual review object”:
{
score: “integer number representing number of star 1 - 5”,
date : “ISO-8601 timestamp string”,
title: “String representing title of review”
review: “String representing review”,
username: “user who submitted review”,
recommended: “boolean whether or not user recommends others buy this product”,
yeses: “Integer representing number of users who found this review helpful”,
noes: “Integer representing number of users who found this review unhelpful”,
verified: “boolean of whether or not reviewer is a verified user”,
promotion: “boolean of whether or not review was collected during a promotion”
}

## POST

Endpoint: /reviews

Server Response: POST route adds unique reviewId property, and integer, to the submitted review object.
This is then submitted to the database which responds with the reviewId enhanced object that was stored.
this is sent in the POST response as confirmation.

{
score: 1,
date: '2018-14-29T05:20:11.603Z',
title: 'New POSTed Review',
review:
'Nostrud fugiat aute excepteur mollit adipisicing quis aliquip. Nisi aliquip culpa. Fugiat sint nulla duis minim nulla. Deserunt Lorem occaecat ipsum aliqua ut aliquip nostrud exercitation deserunt.',
username: 'Ham Sandwich',
recommended: false,
yeses: 0,
noes: 0,
verified: true,
promotion: true,
reviewId: 123
}

## PUT

Endpoint: /reviews/:reviewId

Server Response: StatusCode: 200 on success, PUT route makes changes to review document using supplied fields in need of change.
The response from the database is sent in the PUT response, which is the newly modified document.

Response has same structure as POST response.

## DELETE

Endpoint: /reviews/:reviewId

Server Response: confirmation sent from db query signifying that deletion occured.

{
n: 1,
ok: 1,
deletedCount: 1
}
