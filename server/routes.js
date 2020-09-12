const router = require('express').Router();
const controllers = require('./controllers');

router.get('/averageReviews/:itemId', controllers.averageReviews.get);

router.get('/reviews/:itemId', controllers.reviews.get);

router.post('/reviews', controllers.reviews.post);

router.put('/reviews/:reviewId', controllers.reviews.put);

router.put('/reviews/:reviewId', controllers.reviews.delete);

router.get('/product', controllers.product.get);

module.exports = router;
