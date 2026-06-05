const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

// GET ALL
const getAll = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .collection('cars')
      .find();

    const cars = await result.toArray();

    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE
const getSingle = async (req, res) => {
  try {
    const carId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDb()
      .collection('cars')
      .find({ _id: carId });

    const car = await result.toArray();

    res.status(200).json(car[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE
const createCar = async (req, res) => {
  try {
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

    if (response.acknowledged) {
      res.status(201).json(response);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
const updateCar = async (req, res) => {
  try {
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
      res.status(500).json(response.error || 'Update failed');
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
      res.status(500).json(response.error || 'Delete failed');
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