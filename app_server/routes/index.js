const express = require('express');
const router = express.Router();

const requireLogin = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/login');
};

const ctrlAccount = require('../controllers/account');
const ctrlCourses = require('../controllers/courses');

/* Account pages */
router.get('/register', ctrlAccount.register);
router.post('/register', ctrlAccount.doRegister);
router.get('/login', ctrlAccount.login);
router.post('/login', ctrlAccount.doLogin);
router.post('/logout', ctrlAccount.logout);

/* Courses pages */
router.get('/', ctrlCourses.courses);
router.get('/courses', ctrlCourses.courses);
router.get('/course/:courseid', ctrlCourses.courseInfo);
router.get('/my-courses', requireLogin, ctrlCourses.myCourses);
router.post(
  '/course/:courseid/enroll',
  requireLogin,
  ctrlCourses.enroll
);

module.exports = router;
