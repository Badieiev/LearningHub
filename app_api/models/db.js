require('dotenv').config();

const mongoose = require('mongoose');

const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI)
  .then(() => {
    console.log('Mongoose is connected');
  })
  .catch((err) => {
    console.log('Mongoose connection error:', err);
  });

require('./courses');
require('./users');