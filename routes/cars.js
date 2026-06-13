const router = require('express').Router();
const carsController = require('../controllers/cars');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', carsController.getAll);
router.get('/:id', carsController.getSingle);
router.post('/', isAuthenticated, carsController.createCar);
router.put('/:id', isAuthenticated, carsController.updateCar);
router.delete('/:id', carsController.deleteCar);

module.exports = router;