const mongoose = require('mongoose');
const User = mongoose.model('User');

const register = async function(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Name, email and password are required'
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: 'Email is already registered'
      });
    }

    const user = new User({
      name,
      email
    });

    await User.register(user, password);

    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Registration error:', err);

    return res.status(500).json({
      message: 'Error creating user'
    });
  }
};

const login = async function(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required'
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    const result = await user.authenticate(password);

    if (!result.user) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }
    await new Promise((resolve, reject) => {
      req.logIn(result.user, (err) => {
        if (err) {
          return reject(err);
        }

        resolve();
      });
    });
    return res.status(200).json({
      message: 'Login successful',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Login error:', err);

    return res.status(500).json({
      message: 'Error logging in'
    });
  }
};

module.exports = {
  register,
  login
};