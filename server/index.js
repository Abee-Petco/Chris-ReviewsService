/* eslint-disable func-names */
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const path = require('path');
const router = require('./routes.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  const { referer } = req.headers;

  if (referer) {
    if (referer.includes(`http://${process.env.IP_ADDRESS}:3000`)) {
      res.set('Access-Control-Allow-Origin', '*');
    } else if (referer.includes(`http://${process.env.IP_ADDRESS}:3001`)) {
      res.set('Access-Control-Allow-Origin', '*');
    }
  }
  next();
});

app.use('*.js', function (req, res, next) {
  req.url += '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.use(router);

app.use(serveStatic(path.join(__dirname, '../client/public')), (res) => {
  res.set('Access-Control-Allow-Origin', '*');
});

module.exports = app;

// legacy code not sure will be needed

// const fs = require('fs');
// var zlib = require('zlib');
// const db = require('./app/db.js');
// const {
//   IP_ADDRESS,
//   IP_ADDRESS_E,
//   IP_ADDRESS_K,
// } = require('./app/enviromentalVariables.js');

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

// app.use('/', function (req, res, next) {
//   const { url } = req;

//   if (!url.includes('.png') && !url.includes('.ico') && !url.includes('averageReviews') && !url.includes('reviews')) {
//     res.set('Content-Encoding', 'gzip');
//   }
//   next();
// });
