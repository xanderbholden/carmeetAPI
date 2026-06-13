const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const validateEvent = (req, res) => {
  const { name, location, date, time, host } = req.body;

  if (!name || !location || !date || !time || !host) {
    res.status(400).json({
      message: 'All fields are required: name, location, date, time, host'
    });
    return false;
  }

  return true;
};

// GET ALL
const getAll = async (req, res) => {
  try {
    const events = await mongodb
      .getDb()
      .collection('events')
      .find()
      .toArray();

    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE
const getSingle = async (req, res) => {
  try {
    const eventId = new ObjectId(req.params.id);

    const event = await mongodb
      .getDb()
      .collection('events')
      .findOne({ _id: eventId });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE
const createEvent = async (req, res) => {
  try {
    if (!validateEvent(req, res)) return;

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

    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
const updateEvent = async (req, res) => {
  try {
    if (!validateEvent(req, res)) return;

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
      res.status(404).json({ message: 'Event not found or no changes made' });
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
      res.status(404).json({ message: 'Event not found' });
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