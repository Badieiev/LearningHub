const request = require('request');

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

const doLogin = function(req, res) {
  const path = '/api/login';

  const postdata = {
    email: req.body.email,
    password: req.body.password
  };

  const requestOptions = {
    url: apiOptions.server + path,
    method: 'POST',
    json: postdata
  };

  request(requestOptions, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      res.redirect('/courses');
    } else {
      console.log('Login API error:', body);

      res.render('login', {
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
    }
  });
};

module.exports = {
  register,
  doRegister,
  login,
  doLogin
};
