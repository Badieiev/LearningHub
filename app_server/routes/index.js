const express = require('express');
const router = express.Router();

const ctrlAccount = require('../controllers/account');
const ctrlCourses = require('../controllers/courses');

/* Account pages */
router.get('/register', ctrlAccount.register);
router.post('/register', ctrlAccount.doRegister);
router.get('/login', ctrlAccount.login);
router.post('/login', ctrlAccount.doLogin);

/* Courses pages */
router.get('/', ctrlCourses.courses);
router.get('/courses', ctrlCourses.courses);
router.get('/course/:courseid', ctrlCourses.courseInfo);
router.get('/my-courses', ctrlCourses.myCourses);

module.exports = router;
