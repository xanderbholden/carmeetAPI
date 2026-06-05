const router = require('express').Router();

router.use('/cars', require('./cars'));
router.use('/events', require('./events'));

module.exports = router;