const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const validateAttendee = (req, res) => {
  const { name, email, car, city } = req.body;

  if (!name || !email || !car || !city) {
    res.status(400).json({
      message: 'All fields are required: name, email, car, city'
    });
    return false;
  }

  return true;
};

// GET ALL
const getAll = async (req, res) => {
  try {
    const attendees = await mongodb
      .getDb()
      .collection('attendees')
      .find()
      .toArray();

    res.status(200).json(attendees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE
const getSingle = async (req, res) => {
  try {
    const attendeeId = new ObjectId(req.params.id);

    const attendee = await mongodb
      .getDb()
      .collection('attendees')
      .findOne({ _id: attendeeId });

    if (!attendee) {
      return res.status(404).json({ message: 'Attendee not found' });
    }

    res.status(200).json(attendee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE
const createAttendee = async (req, res) => {
  try {
    if (!validateAttendee(req, res)) return;

    const attendee = {
      name: req.body.name,
      email: req.body.email,
      car: req.body.car,
      city: req.body.city
    };

    const response = await mongodb
      .getDb()
      .collection('attendees')
      .insertOne(attendee);

    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
const updateAttendee = async (req, res) => {
  try {
    if (!validateAttendee(req, res)) return;

    const attendeeId = new ObjectId(req.params.id);

    const attendee = {
      name: req.body.name,
      email: req.body.email,
      car: req.body.car,
      city: req.body.city
    };

    const response = await mongodb
      .getDb()
      .collection('attendees')
      .replaceOne({ _id: attendeeId }, attendee);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Attendee not found or no changes made' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
const deleteAttendee = async (req, res) => {
  try {
    const attendeeId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDb()
      .collection('attendees')
      .deleteOne({ _id: attendeeId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Attendee not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createAttendee,
  updateAttendee,
  deleteAttendee
};