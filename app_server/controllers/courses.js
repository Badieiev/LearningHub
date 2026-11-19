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

const myCourses = async function(req, res) {
  try {
    const User = require('mongoose').model('User');

    const user = await User.findById(req.user._id)
      .populate('enrollments.course');

    if (!user) {
      return res.status(404).send('User not found');
    }

    const courses = user.enrollments
      .map(enrollment => enrollment.course)
      .filter(course => course !== null);

    return res.render('my-courses', {
      title: 'My Courses',

      pageHeader: {
        title: 'My Courses'
      },

      message: courses.length === 0
        ? 'You have not enrolled in any courses yet.'
        : null,

      courses: courses
    });

  } catch (err) {
    console.error('Error loading user courses:', err);
    return res.status(500).send('Error loading courses');
  }
};

const enroll = async function(req, res) {
  try {
    const mongoose = require('mongoose');
    const User = mongoose.model('User');
    const Course = mongoose.model('Course');

    const courseId = req.params.courseid;

    if (!mongoose.isValidObjectId(courseId)) {
      return res.status(400).send('Invalid course ID');
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).send('Course not found');
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    const alreadyEnrolled = user.enrollments.some(
      enrollment => enrollment.course.toString() === courseId
    );

    if (!alreadyEnrolled) {
      user.enrollments.push({
        course: course._id,
        enrolledOn: new Date()
      });

      await user.save();
    }

    return res.redirect('/my-courses');

  } catch (err) {
    console.error('Enrollment error:', err);
    return res.status(500).send('Enrollment failed');
  }
};

module.exports = {
  courses,
  courseInfo,
  myCourses,
  enroll
};