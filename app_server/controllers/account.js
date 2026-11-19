const request = require('request');

const mongoose = require('mongoose');
const User = mongoose.model('User');

const apiOptions = {
  server: 'http://localhost:3000'
};

if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://myproject-4u8p.onrender.com';
}

/* GET register page */
const register = function(req, res) {
  res.render('register', {
    title: 'Register',

    pageHeader: {
      title: 'Register'
    },

    form: {
      nameLabel: 'Name',
      emailLabel: 'Email',
      passwordLabel: 'Password',
      confirmPasswordLabel: 'Confirm Password',
      buttonText: 'Register'
    }
  });
};

/* POST register page */
const doRegister = function(req, res) {
  const path = '/api/register';

  const postdata = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };

  const requestOptions = {
    url: apiOptions.server + path,
    method: 'POST',
    json: postdata
  };

  request(requestOptions, (err, response, body) => {
    if (!err && response.statusCode === 201) {
      res.redirect('/login');
    } else {
      console.log('Registration API error:', body);
  
      res.render('register', {
        title: 'Register',

        pageHeader: {
          title: 'Register'
        },

        form: {
          nameLabel: 'Name',
          emailLabel: 'Email',
          passwordLabel: 'Password',
          confirmPasswordLabel: 'Confirm Password',
          buttonText: 'Register'
        },

        error: 'Registration failed. Please check your details.'
      });
    }
  });
};

/* GET login page */
const login = function(req, res) {
  res.render('login', {
    title: 'Login',

    pageHeader: {
      title: 'Login'
    },

    form: {
      emailLabel: 'Email',
      passwordLabel: 'Password',
      buttonText: 'Login'
    }
  });
};

const doLogin = async function(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      const result = await user.authenticate(password);

      if (result.user) {
        await new Promise((resolve, reject) => {
          req.logIn(result.user, (err) => {
            if (err) {
              return reject(err);
            }

            resolve();
          });
        });

        return res.redirect('/courses');
      }
    }

    return res.render('login', {
      title: 'Login',
      pageHeader: {
        title: 'Login'
      },
      form: {
        emailLabel: 'Email',
        passwordLabel: 'Password',
        buttonText: 'Login'
      },
      error: 'Incorrect email or password.'
    });

  } catch (err) {
    console.error('Login error:', err);

    return res.status(500).render('login', {
      title: 'Login',
      pageHeader: {
        title: 'Login'
      },
      form: {
        emailLabel: 'Email',
        passwordLabel: 'Password',
        buttonText: 'Login'
      },
      error: 'An error occurred during login.'
    });
  }
};

const logout = function(req, res, next) {
  req.logout(function(err) {
    if (err) {
      return next(err);
    }

    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      }

      res.clearCookie('connect.sid');
      return res.redirect('/login');
    });
  });
};

module.exports = {
  register,
  doRegister,
  login,
  doLogin,
  logout
};
