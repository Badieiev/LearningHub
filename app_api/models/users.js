const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose').default;

const enrollmentSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  enrolledOn: {
    type: Date,
    default: Date.now
  }
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String
  },
  enrollments: [enrollmentSchema]
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email'
});

mongoose.model('User', userSchema);