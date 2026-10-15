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
            .json({ message: 'courseid not found' });
        }

        res
          .status(200)
          .json(course);
      })
      .catch(err => {
        res
          .status(500)
          .json({
            message: 'Error retrieving course',
            error: err
          });
      });
  } else {
    res
      .status(400)
      .json({ message: 'No courseid in request' });
  }
};

module.exports = {
  coursesList,
  coursesReadOne
};