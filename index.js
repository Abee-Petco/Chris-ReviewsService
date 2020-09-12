/* eslint-disable func-names */
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const { IP_ADDRESS, IP_ADDRESS_E, IP_ADDRESS_K } = require('./server/environmentalVariables.js');

const server = express();
// eslint-disable-next-line import/no-absolute-path
const pgdb = require('./server/models/pgmodels.js');

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(morgan('dev'));

server.use(function (req, res, next) {
  const { referer } = req.headers;

  if (referer) {
    if (referer.includes(`http://${IP_ADDRESS}:3000`)) {
      res.header('Access-Control-Allow-Origin', `http://${IP_ADDRESS}:3000`);
    } else if (referer.includes(`http://${IP_ADDRESS_E}:3000`)) {
      res.header('Access-Control-Allow-Origin', `http://${IP_ADDRESS_E}:3000`);
    } else if (referer.includes(`http://${IP_ADDRESS_K}:3000`)) {
      res.header('Access-Control-Allow-Origin', `http://${IP_ADDRESS_K}:3000`);
    } else if (referer.includes(`http://${IP_ADDRESS_E}:3005`)) {
      res.header('Access-Control-Allow-Origin', `http://${IP_ADDRESS_E}:3005`);
    } else if (referer.includes(`http://${IP_ADDRESS}:3004`)) {
      res.header('Access-Control-Allow-Origin', `http://${IP_ADDRESS}:3004`);
    }
  }
  next();
});

server.use('*.js', function (req, res, next) {
  req.url += '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

server.use(serveStatic('./client/public'));

server.get('/averageReviews/:itemId', (req, res) => {
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
});

// reviewsByItemId
server.get('/reviews/:itemId', (req, res) => {
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
          console.log('server', result);
          reviewsByItemId.reviewAverage = `${result[0].review_average}`;
          reviewsByItemId.numberOfReviews = result[0].number_of_reviews;
          res.status(200).send(reviewsByItemId);
        });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

server.post('/reviews', (req, res) => {
  pgdb
    .addReview(req.body)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

server.put('/reviews/:reviewId', (req, res) => {
  const id = req.params.reviewId;

  pgdb
    .updateReview(req.body.review, id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

server.delete('/reviews/:reviewId', (req, res) => {
  pgdb.deleteReview(req.params.reviewId).then((result) => {
    res.status(200).send(result);
  });
});

server.get('/product', (req, res) => {
  const { itemID } = req.query;
  const itemIdNumber = Number.parseInt(itemID, 10);

  if (itemIdNumber < 100 || itemIdNumber > 10000100 || itemIdNumber === undefined) {
    res.status(404).send('itemID invalid');
  } else {
    res.sendFile(`${__dirname}/client/public/index.html`);
  }
});

module.exports = server;

// const fs = require('fs');
// var zlib = require('zlib');
// const db = require('./server/db.js');
// const {
//   IP_ADDRESS,
//   IP_ADDRESS_E,
//   IP_ADDRESS_K,
// } = require('./server/enviromentalVariables.js');

// function generateGzipHTML () {
//   fs.readFile(`${__dirname}/../client/src/index.html`, (error, data) => {
//     if (error) {
//       console.log(error);
//     }
//     var gzipped = zlib.gzipSync(data);
//     fs.writeFile(`${__dirname}/../client/public/index.html`, gzipped, (error) => {
//       if (error) {
//         console.log(error);
//       }
//     })
//   })
// }
// generateGzipHTML();

// server.use('/', function (req, res, next) {
//   const { url } = req;

//   if (!url.includes('.png') && !url.includes('.ico') && !url.includes('averageReviews') && !url.includes('reviews')) {
//     res.set('Content-Encoding', 'gzip');
//   }
//   next();
// });
