require("dotenv").config();
const { connect, connection } = require('mongoose');

connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mern-shopping');
// mern-shopping is the name of the local db

module.exports = connection;
