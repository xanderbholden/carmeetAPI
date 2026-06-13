const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const validateCar = (req, res) => {
  const { make, model, year, color, owner } = req.body;

  if (!make || !model || !year || !color || !owner) {
    res.status(400).json({
      message: 'All fields are required: make, model, year, color, owner'
    });
    return false;
  }

  if (typeof year !== 'number') {
    res.status(400).json({
      message: 'Year must be a number'
    });
    return false;
  }

  return true;
};

// GET ALL
const getAll = async (req, res) => {
  try {
    const cars = await mongodb
      .getDb()
      .collection('cars')
      .find()
      .toArray();

    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE
const getSingle = async (req, res) => {
  try {
    const carId = new ObjectId(req.params.id);

    const car = await mongodb
      .getDb()
      .collection('cars')
      .findOne({ _id: carId });

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.status(200).json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE
const createCar = async (req, res) => {
  try {
    if (!validateCar(req, res)) return;

    const car = {
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      color: req.body.color,
      owner: req.body.owner
    };

    const response = await mongodb
      .getDb()
      .collection('cars')
      .insertOne(car);

    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
const updateCar = async (req, res) => {
  try {
    if (!validateCar(req, res)) return;

    const carId = new ObjectId(req.params.id);

    const car = {
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      color: req.body.color,
      owner: req.body.owner
    };

    const response = await mongodb
      .getDb()
      .collection('cars')
      .replaceOne({ _id: carId }, car);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Car not found or no changes made' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
const deleteCar = async (req, res) => {
  try {
    const carId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDb()
      .collection('cars')
      .deleteOne({ _id: carId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Car not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createCar,
  updateCar,
  deleteCar
};