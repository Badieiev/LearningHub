const express = require('express');
const router = express.Router();

const ctrlCourses = require('../controllers/courses');
const ctrlAuth = require('../controllers/authentication');

// Courses
router
  .route('/courses')
  .get(ctrlCourses.coursesList);

router
  .route('/courses/:courseid')
  .get(ctrlCourses.coursesReadOne);

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
module.exports = router;