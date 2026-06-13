const router = require('express').Router();
const attendeesController = require('../controllers/attendees');

router.get('/', attendeesController.getAll);
router.get('/:id', attendeesController.getSingle);
router.post('/', attendeesController.createAttendee);
router.put('/:id', attendeesController.updateAttendee);
router.delete('/:id', attendeesController.deleteAttendee);

module.exports = router;