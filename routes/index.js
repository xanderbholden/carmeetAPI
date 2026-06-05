const router = require('express').Router();

router.use('/cars', require('./cars'));
router.use('/events', require('./events'));

module.exports = router;

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Car Meet API',
    docs: '/api-docs'
  });
});