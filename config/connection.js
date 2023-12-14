const { connect, connection } = require('mongoose');

const connectionString = process.env.MONGODB_URI || 'mongodb+srv://Cluster80296:W0hNfkladm1z@cluster80296.2jtrnma.mongodb.net/usersDB';

connect(connectionString);

module.exports = connection;