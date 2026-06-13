const router = require('express').Router();
const vendorsController = require('../controllers/vendors');

router.get('/', vendorsController.getAll);
router.get('/:id', vendorsController.getSingle);
router.post('/', vendorsController.createVendor);
router.put('/:id', vendorsController.updateVendor);
router.delete('/:id', vendorsController.deleteVendor);

module.exports = router;