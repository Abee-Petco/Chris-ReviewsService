# reviews

Handles all reviews and review-related visuals for PetToyCo

## Related Projects

- https://github.com/PetToyCo/photo-gallery
- https://github.com/PetToyCo/description_directions_attributes_
- https://github.com/PetToyCo/mainTitle_price
- https://github.com/PetToyCo/ProductRecommendations
- https://github.com/PetToyCo/deliver-pickup

This service can be run independently of the others above. To include the above services the proxy is required. The proxy can be found at https://github.com/Abee-Petco/Chris-proxy

## Table of Contents

1. Requirements
2. Usage local, stand alone service
3. Usage with a Proxy server
4. images

## Requirements

- Node 12.16.1
- Postgres 12.4

## Usage - local standalone service

From application root folder:

1. From the terminal: npm install, npm run build.

2. If not already present, create db in Postgres named petco_reviews. Run psql petco-reviews, then run each block in Schema.sql in the order listed to create 4 tables.

3. Also from psql, run each 'COPY' block in PgSeedingQueries.sql from top to bottom. Again, order matters here.

4. run npm start

5. To see the reviews service in action, visit: http://127.0.0.1:3001/product?itemID=### where ### is a number 100-10000100

6. To run the service's tests, follow these steps:
   a. Open ./client/src/service.jsx
   b. There is a line of code with 'MODAL_ATTACH_POINT' as part of its code. Uncomment this and save the file. Don't forget to re-comment-out and save if you want to continue exploring the service.
   c. Then from the terminal within the service's root directory enter 'npm run test'.

## Usage with a Proxy Server

1. In your proxy's index.html file, make sure there is this tag in the approproate location, within the body element:

```
<div id="REVIEWS_ATTACH_POINT"></div>
```

Without this tag, the Reviews module will not be able to mount itself in the DOM.

You will also need this tag:

```
<div
  id="MODAL_ATTACH_POINT"
  style="
    position: absolute;
    top: -20px;
    left: -20px;
    visibility: hidden;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 100;
  "
>
</div>
```

**Recommended location is directly under the opening `<body>` tag. This tag allows modals to attach in a proxy.**

4.  The proxy server's valid urls must include the search param `?itemID=` followed by a number from 100 - 10000100.

5.  This service also has the following endpoints (where :itemId can be a value from 100-10000100):

    **Endpoint:**

        /averageReviews/:itemId

    **Server Response:**

```
    {
      reviewAverage: "<number>",
      numberOfReviews: integer
    }
```

This endpoint will also handle arrays if entered in the format: `/averageReviews/array,number,number...` where 'array' is literally the word 'array', and each 'number' is an integer from 100 - 10000100

**Server Response:**

```
[
  {
    "itemId": 3421,
    "reviewAverage": "3.0",
    "numberOfReviews": 4
  },
  {
    "itemId": 3456,
    "reviewAverage": "4.3",
    "numberOfReviews": 4
  },
  {
    "itemId": 3476,
    "reviewAverage": "4.3",
    "numberOfReviews": 4
  }
]
```

**Endpoint:**

    /reviews/:itemId

**Server Response example:**

```
{
"allReviews": [
    {
      "score": 4,
      "date": "2020-02-25T07:26:58.603Z",
      "title": "id laborum non do",
      "review": "Laborum culpa exercitation incididunt. Id ex nulla anim aliquip.",
      "recommended": true,
      "promotion": false,
      "username": "proident laborum",
      "yeses": 0,
      "noes": 0,
      "userId": 1343391,
      "itemId": 6738,
      "reviewId": 20009
    },
    {
      "score": 1,
      "date": "2018-06-25T14:59:59.603Z",
      "title": "est esse quis nulla",
      "review": "Aute proident duis incididunt. Fugiat cupidatat ullamco. Proident reprehenderit eiusmod aliquip velit mollit.",
      "recommended": false,
      "promotion": true,
      "username": "ut officia",
      "yeses": 0,
      "noes": 0,
      "userId": 879880,
      "itemId": 6738,
      "reviewId": 20010
    }
  ],
  "reviewAverage": "2.5",
  "numberOfReviews": 2
}
```

## Images

The folder client/public contains numerous images. As noted in a text file contined within that folder (imgAttribution.txt), those images were:

"All images taken from https://www.petco.com/shop/en/petcostore/product/cat/cat-toys/leaps-and-bounds-faux-leather-mouse-cat-toy-with-rattle-and-catnip June/July 2020"
