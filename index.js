const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const {
  addId,
  addReview,
  updateReview,
  deleteReview,
} = require('./server/models/index.js');
// const fs = require('fs');
// var zlib = require('zlib');
const db = require('./server/db.js');
const {
  IP_ADDRESS,
  IP_ADDRESS_E,
  IP_ADDRESS_K,
} = require('./server/enviromentalVariables.js');

const server = express();
const seedTestDb = require('./server/seedTestDb.js');

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
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(morgan('dev'));

if (process.env.node_env === 'test') {
  seedTestDb();
}

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

// server.use('/', function (req, res, next) {
//   const { url } = req;

//   if (!url.includes('.png') && !url.includes('.ico') && !url.includes('averageReviews') && !url.includes('reviews')) {
//     res.set('Content-Encoding', 'gzip');
//   }
//   next();
// });

server.use(serveStatic('./client/public'));
// server.use('/test', serveStatic('./test'));

server.get('/averageReviews/:itemId', (req, res) => {
  const { itemId } = req.params;
  if (itemId.includes('array')) {
    const itemsInArray = itemId.substring(5);
    const itemIds = itemsInArray.split(',');
    const itemNumIds = itemIds.map((id) => +id);

    db.retrieveAggregateReviews(itemNumIds)
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
    db.retrieveAggregateReview(+itemId)
      .then((data) => {
        if (data) {
          const numberOfReviews = data.numberOfReviews;
          const reviewAverage = `${data.reviewAverage}`;

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

server.get('/reviews/:itemId', (req, res) => {
  const { itemId } = req.params;
  let aggregateReview;

  db.retrieveAggregateReview(itemId)
    .then((data) => {
      if (data) {
        const allReviews = JSON.parse(data.allReviews);

        aggregateReview = data;
        aggregateReview.reviewAverage = `${aggregateReview.reviewAverage}`;
        aggregateReview.itemId = `${aggregateReview.itemId}`;

        return db.retrieveIndividualReviews(allReviews);
      } else {
        res.status(404).send('Item does not exist');
        return null;
      }
    })
    .then((data) => {
      if (data) {
        const reviewAverage = aggregateReview.reviewAverage;
        const numberOfReviews = aggregateReview.numberOfReviews;

        res
          .status(200)
          .send({ reviewAverage, numberOfReviews, allReviews: data });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

server.post('/reviews', (req, res) => {
  const newReview = addId(req.body);
  newReview
    .then((newReview) => {
      addReview(newReview).then((doc) => {
        console.log('Added', doc);
        res.send(doc);
      });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send('There was a problem, please refresh and try again.');
    });
});

server.put('/reviews/:reviewId', (req, res) => {
  const id = req.params.reviewId;
  const update = req.body;

  updateReview(id, update)
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      throw err;
    });
});

server.delete('/reviews/:reviewId', (req, res) => {
  const id = req.params.reviewId;
  deleteReview(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      throw err;
    });
});

server.get('/product', (req, res) => {
  const { itemID } = req.query;
  const itemIdNumber = Number.parseInt(itemID, 10);

  if (itemIdNumber < 100 || itemIdNumber > 199 || itemIdNumber === undefined) {
    res.status(404).send('itemID invalid');
  } else {
    res.sendFile(`${__dirname}/client/public/index.html`);
  }
});

module.exports = server;
