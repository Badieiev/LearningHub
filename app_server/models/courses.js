const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  description: {
    type: String,
    required: true
  },
  topics: [String],
  about: {
    type: String
  }
});

mongoose.model('Course', courseSchema);