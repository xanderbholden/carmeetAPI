const { MongoClient } = require('mongodb');

let database;

const initDb = async () => {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URL);
    database = client.db('carMeetAPI');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getDb = () => {
  if (!database) {
    throw new Error('Database not initialized');
  }
  return database;
};

module.exports = { initDb, getDb };