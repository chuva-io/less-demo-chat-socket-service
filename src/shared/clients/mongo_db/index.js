const { MongoClient } = require('mongodb');

const { MONGO_DB_URI, MONGO_DB_NAME } = process.env;
let client;

async function connect() {
  if (!client) {
    client = new MongoClient(MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
  }
}

async function insert_connection_id(connectionId) {
  await connect();
  const db = client.db(MONGO_DB_NAME);
  const collection = db.collection('connection_ids');
  await collection.insertOne({ connection_id: connectionId });
}

async function delete_connection_id(connectionId) {
  await connect();
  const db = client.db(MONGO_DB_NAME);
  const collection = db.collection('connection_ids');
  const result = await collection.deleteOne({ connection_id: connectionId });
  return result.deletedCount;
}

async function get_all_connection_ids() {
  await connect();
  const db = client.db(MONGO_DB_NAME);
  const collection = db.collection('connection_ids');
  const connectionIds = await collection.find().project({ _id: 0, connection_id: 1 }).toArray();
  return connectionIds;
}

module.exports = {
  insert_connection_id,
  delete_connection_id,
  get_all_connection_ids
};
