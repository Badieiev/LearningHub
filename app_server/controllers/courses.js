const request = require('request');

const apiOptions = {
  server: 'http://localhost:3000'
};

if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://myproject-4u8p.onrender.com';
}

const _renderCourses = function(req, res, courses) {
  res.render('courses', {
    title: 'LearningHub',

    pageHeader: {
      title: 'All Courses',
      strapline: 'Find a course and start learning new skills'
    },

    courses: courses
  });
};

const courses = function(req, res) {
  const path = '/api/courses';

  const requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {}
  };

  request(requestOptions, (err, response, body) => {
    let courses = [];

    if (!err && response.statusCode === 200 && Array.isArray(body)) {
      courses = body;
    } else {
      console.log('API error or non-array body:', body);
    }

    _renderCourses(req, res, courses);
  });
};

const courseInfo = function(req, res) {
  const path = `/api/courses/${req.params.courseid}`;

  const requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {}
  };

  request(requestOptions, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      res.render('course-info', {
        title: 'Course Information',
        course: body
      });
    } else {
      console.log('API error:', body);

      res.status(response ? response.statusCode : 500);

      res.render('error', {
        message: 'Course not found',
        error: {}
      });
    }
  });
};

const myCourses = function(req, res) {
  res.render('my-courses', {
    title: 'My Courses',

    pageHeader: {
      title: 'My Courses'
    },

    message: 'You have not enrolled in any courses yet.',
    courses: []
  });
};

module.exports = {
  courses,
  courseInfo,
  myCourses
};