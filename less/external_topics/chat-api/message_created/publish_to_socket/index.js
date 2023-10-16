// Import `sockets` from Less.
const { sockets } = require('@chuva.io/less');
const { mongo_db } = require('clients');

module.exports.process = async (payload) => {
    // Get all connected socket clients from the Mongo client.
    const connection_ids = (await mongo_db.get_all_connection_ids())
      .map(entry => entry.connection_id.toString());

    // Send the payload to the desired `connection_ids`.
    await sockets.chat.publish(payload, connection_ids);
};