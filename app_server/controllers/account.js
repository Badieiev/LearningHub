/* GET register page */
const register = function(req, res) {
  res.render('register', { title: 'Register' });
};

/* GET login page */
const login = function(req, res) {
  res.render('login', { title: 'Login' });
};

module.exports = {
  register,
  login
};