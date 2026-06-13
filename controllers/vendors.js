const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const validateVendor = (req, res) => {
  const { company, service, contact } = req.body;

  if (!company || !service || !contact) {
    res.status(400).json({
      message: 'All fields are required: company, service, contact'
    });
    return false;
  }

  return true;
};

// GET ALL
const getAll = async (req, res) => {
  try {
    const vendors = await mongodb
      .getDb()
      .collection('vendors')
      .find()
      .toArray();

    res.status(200).json(vendors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE
const getSingle = async (req, res) => {
  try {
    const vendorId = new ObjectId(req.params.id);

    const vendor = await mongodb
      .getDb()
      .collection('vendors')
      .findOne({ _id: vendorId });

    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    res.status(200).json(vendor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE
const createVendor = async (req, res) => {
  try {
    if (!validateVendor(req, res)) return;

    const vendor = {
      company: req.body.company,
      service: req.body.service,
      contact: req.body.contact
    };

    const response = await mongodb
      .getDb()
      .collection('vendors')
      .insertOne(vendor);

    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
const updateVendor = async (req, res) => {
  try {
    if (!validateVendor(req, res)) return;

    const vendorId = new ObjectId(req.params.id);

    const vendor = {
      company: req.body.company,
      service: req.body.service,
      contact: req.body.contact
    };

    const response = await mongodb
      .getDb()
      .collection('vendors')
      .replaceOne({ _id: vendorId }, vendor);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Vendor not found or no changes made' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
const deleteVendor = async (req, res) => {
  try {
    const vendorId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDb()
      .collection('vendors')
      .deleteOne({ _id: vendorId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Vendor not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createVendor,
  updateVendor,
  deleteVendor
};