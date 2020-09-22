const router = require('express').Router();
const cache = require('memory-cache');
const controllers = require('./controllers');

const memCache = new cache.Cache();

const cacheMiddleware = (duration) => {
  return (req, res, next) => {
    // eslint-disable-next-line prefer-template
    const key = '__express__' + req.originalUrl || req.url;
    const cacheContent = memCache.get(key);

    if (cacheContent) {
      res.send(JSON.parse(cacheContent));
      return;
    }
    res.sendResponse = res.send;
    res.send = (body) => {
      memCache.put(key, body, duration * 1000);
      res.sendResponse(body);
    };

    next();
  };
};

router.get('/averageReviews/:itemId', cacheMiddleware(30), controllers.averageReviews.get);

router.get('/reviews/:itemId', cacheMiddleware(30), controllers.reviews.get);

router.post('/reviews', controllers.reviews.post);

router.put('/reviews/:reviewId', controllers.reviews.put);

router.delete('/reviews/:reviewId', controllers.reviews.delete);

router.get('/product', cacheMiddleware(30), controllers.product.get);

module.exports = router;
