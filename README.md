# reviews

Handles all reviews and review-related visuals for PetToyCo

## Related Projects

- https://github.com/PetToyCo/photo-gallery
- https://github.com/PetToyCo/description_directions_attributes_
- https://github.com/PetToyCo/mainTitle_price
- https://github.com/PetToyCo/ProductRecommendations
- https://github.com/PetToyCo/deliver-pickup

None of the Related Projects need to be used to run this service. However, you will need a proxy to take advantage of it. The proxy can be found at https://github.com/PetToyCo/nick-proxy-server

## Table of Contents

1. Usage Development/Service Mode
2. Usage with a Proxy Server
3. Usage as a Deployed Service
4. Seeding Database
5. Requirements
6. Development
7. images

## Usage Development/Service Mode

From project's root folder:

1. In terminal: npm install, npm genSQL.
2. Create db in Postgres named petco_reviews. From psql, use Schema.sql blocks to create tables in the order listed.
3. To seed db, run each 'COPY' block in PgSeedingQueries from top to bottom. Order matters here.
4. Run npm run build in terminal.
5. At this point, npm start will start the service with a default itemID.At this point, everything is ready to be used in Service Mode.
6. To see the actual service in action, visit: http://127.0.0.1:3001/product?itemID=### where ### is a number 100-10000100
7. To run the service's tests, follow these steps:
   a. Open ./client/src/service.jsx
   b. There is a line of code with 'MODAL_ATTACH_POINT' as part of its code. Uncomment this and save the file. Don't forget to re-comment-out and save if you want to continue exploring the service.
   c. Then run from project's root directory in terminal >npm run test.

## Usage with a Proxy Server

1. Follow steps 1-3 in the above section titled "Usage Development/Service Mode"

2. In your proxy's index.html file, make sure there is this tag in the approproate location, within the <body>:
<div id="REVIEWS_ATTACH_POINT"></div>
Without this tag, the Reviews module will not be able to mount itself in the DOM. The "appropriate" location is where ever the reviews appear on a real PetCo product page, in relatoin to the other elements

You will also need this tag:

<div
  id="MODAL_ATTACH_POINT"
  style="position: absolute; top: -20px; left: -20px; visibility: hidden; overflow: hidden; background-color: rgba(0, 0, 0, 0.4); z-index: 100;"
></div>
Recommended you put it directly under the opening <body> tag so there is no unintended side-effects. This tag allows modals to attach in a proxy.

3. To complete the modal functionality, you will also need to add the following after the closing </body> tag:
<script>
  const callback = function() {
    const body = document.body;

    let height = body.scrollHeight + 40;
    let width = body.scrollWidth + 40;

    const modalAttachPoint = document.getElementById("MODAL_ATTACH_POINT");

    modalAttachPoint.style.height = `${height}px`;
    modalAttachPoint.style.width = `${width}px`;
  };

window.addEventListener('resize', callback);

const targetNode = document.body;
const observer = new MutationObserver(callback);
const config = { childList: true, subtree: true, attributes: false };
observer.observe(targetNode, config);
</script>

4. The proxy server's valid urls must include the search param ?itemID="value 100 to 199 without the quotes."

5. You will also need the following CDN links posted ABOVE the tag in step 2:
   <script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
   <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
   <script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js"></script>
   <script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/redux/4.0.5/redux.min.js"></script>
   <script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react-redux/7.2.0/react-redux.min.js"></script>
   <script crossorigin src="https://momentjs.com/downloads/moment.min.js"></script>
   <link href="https://fonts.googleapis.com/css2?family=Nunito&display=swap" rel="stylesheet" async>

6. To retrieve the Reviews Module, use the script tag
<script src="http://127.0.0.1:3001/app.js" async></script>

7. This service also has the following endpoints (where :itemId can be a value from 100-199):

Endpoint: /averageReviews/:itemId
Server Response:
{
reviewAverage: “String between 0-5 representing average number of stars for that item”,
numberOfReviews: “Integer number representing number of reviews for that item”
}

UNLESS the itemId is in the form: array,number,number,number where "number" is actually a number from 100-199 (however, since they are in a URL, they are string versions of numbers)

THEN server response:

An array filled with objects. Each object is the object that would normally return, but with the additional property "itemId"

Endpoint: /reviews/:itemId
Server Response:
{
reviewAverage: “String representing float number between 0-5 representing average number of stars for that item”,
numberOfReviews: “Integer number representing number of reviews for that item”,
allReviews: [array filled with “individual review object”s],
}

“Individual review object”: {
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

## Requirements

- Node 12.16.1
- Postgres 12.4

### Installing Dependencies

From within the root directory: npm install

## Images

The folder client/public contains numerous images. As noted in a text file contined within that folder (imgAttribution.txt), those images were:

"All images taken from https://www.petco.com/shop/en/petcostore/product/cat/cat-toys/leaps-and-bounds-faux-leather-mouse-cat-toy-with-rattle-and-catnip June/July 2020"
