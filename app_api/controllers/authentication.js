const mongoose = require('mongoose');
const User = mongoose.model('User');

const register = function(req, res) {
  User.create({
    name: req.body.name,
    email: req.body.email,
    passwordHash: req.body.password
  })
    .then(user => {
      res
        .status(201)
        .json(user);
    })
    .catch(err => {
      res
        .status(400)
        .json({
          message: 'Error creating user',
          error: err
        });
    });
};

const login = function(req, res) {
  User
    .findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res
          .status(404)
          .json({ message: 'User not found' });
      }

      if (user.passwordHash !== req.body.password) {
        return res
          .status(401)
          .json({ message: 'Incorrect password' });
      }

      res
        .status(200)
        .json({
          message: 'Login successful',
          user: {
            _id: user._id,
            name: user.name,
            email: user.email
          }
        });
    })
    .catch(err => {
      res
        .status(500)
        .json({
          message: 'Error logging in',
          error: err
        });
    });
};

module.exports = {
  register,
  login
};