const courses = function(req, res) {
  res.render('courses', { title: 'LearningHub' });
};

const courseInfo = function(req, res) {
  res.render('course-info', { title: 'Course Information' });
};

const myCourses = function(req, res) {
  res.render('my-courses', { title: 'My Courses' });
};

module.exports = {
  courses,
  courseInfo,
  myCourses
};