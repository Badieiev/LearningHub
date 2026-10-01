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

module.exports = {
  register,
  login
};