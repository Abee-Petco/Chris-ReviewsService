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
    if (referer.includes(`http://${process.env.PROXY_IP_ADDRESS}:3000`)) {
      res.set('Access-Control-Allow-Origin', '*');
    } else if (referer.includes(`http://${process.env.IP_ADDRESS}:3009`)) {
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

app.use(serveStatic(path.join(__dirname, '../client/public')));

module.exports = app;
