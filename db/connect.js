const { MongoClient } = require('mongodb');

let database;

const initDb = async () => {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URL);
    database = client.db();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }
};

const getDb = () => {
  return database;
};

module.exports = { initDb, getDb };