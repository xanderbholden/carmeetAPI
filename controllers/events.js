const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

// GET ALL
const getAll = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .collection('events')
      .find();

    const events = await result.toArray();

    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE
const getSingle = async (req, res) => {
  try {
    const eventId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDb()
      .collection('events')
      .find({ _id: eventId });

    const event = await result.toArray();

    res.status(200).json(event[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE
const createEvent = async (req, res) => {
  try {
    const event = {
      name: req.body.name,
      location: req.body.location,
      date: req.body.date,
      time: req.body.time,
      host: req.body.host
    };

    const response = await mongodb
      .getDb()
      .collection('events')
      .insertOne(event);

    if (response.acknowledged) {
      res.status(201).json(response);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
const updateEvent = async (req, res) => {
  try {
    const eventId = new ObjectId(req.params.id);

    const event = {
      name: req.body.name,
      location: req.body.location,
      date: req.body.date,
      time: req.body.time,
      host: req.body.host
    };

    const response = await mongodb
      .getDb()
      .collection('events')
      .replaceOne({ _id: eventId }, event);

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
const deleteEvent = async (req, res) => {
  try {
    const eventId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDb()
      .collection('events')
      .deleteOne({ _id: eventId });

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
  createEvent,
  updateEvent,
  deleteEvent
};