const { mongo_db } = require('clients');

// On connect, retrieve the `connection_id` and save it to Mongo.
exports.process = async ({ connection_id }) => 
  await mongo_db.insert_connection_id(connection_id);