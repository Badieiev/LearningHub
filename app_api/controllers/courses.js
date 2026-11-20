const mongoose = require('mongoose');
const Course = mongoose.model('Course');

const coursesList = function(req, res) {
  Course
    .find()
    .then(courses => {
      res
        .status(200)
        .json(courses);
    })
    .catch(err => {
      res
        .status(500)
        .json({
          message: 'Error retrieving courses',
          error: err
        });
    });
};

const coursesReadOne = function(req, res) {
  if (req.params && req.params.courseid) {
    Course
      .findById(req.params.courseid)
      .then(course => {
        if (!course) {
          return res
            .status(404)
            .json({ message: 'Course not found' });
        }

        return res
          .status(200)
          .json(course);
      })
      .catch(err => {
        if (err.name === 'CastError') {
          return res
            .status(400)
            .json({ message: 'Invalid course ID' });
        }

        return res
          .status(500)
          .json({ message: 'Error retrieving course' });
      });
  } else {
    return res
      .status(400)
      .json({ message: 'No courseid in request' });
  }
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

module.exports = {
  coursesList,
  coursesReadOne,
  myCourses
};