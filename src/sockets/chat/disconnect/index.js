const { mongo_db } = require('clients');

// On disconnect, retrieve the `connection_id` and delete it from Mongo.
exports.process = async ({ connection_id }) =>
  await mongo_db.delete_connection_id(connection_id);