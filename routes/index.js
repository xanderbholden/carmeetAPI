const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Car Meet API',
    docs: '/api-docs'
  });
});

router.use('/cars', require('./cars'));
router.use('/events', require('./events'));
router.use('/attendees', require('./attendees'));
router.use('/vendors', require('./vendors'));

module.exports = router;