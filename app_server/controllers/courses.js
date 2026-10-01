const courses = function(req, res) {
  res.render('courses', {
    title: 'LearningHub',

    pageHeader: {
      title: 'All Courses',
      strapline: 'Find a course and start learning new skills'
    },

    courses: [
      {
        name: 'Web Development',
        rating: 4.8,
        description: 'Learn HTML, CSS and JavaScript.'
      },
      {
        name: 'Python',
        rating: 4.7,
        description: 'Learn Python programming.'
      },
      {
        name: 'Databases',
        rating: 4.5,
        description: 'Learn database fundamentals.'
      },
      {
        name: 'Node.js',
        rating: 4.6,
        description: 'Learn backend development.'
      }
    ]
  });
};

const courseInfo = function(req, res) {
  res.render('course-info', {
    title: 'Course Information',

    course: {
      name: 'Web Development',
      rating: 4.8,
      description: 'Learn HTML, CSS and JavaScript.',
      topics: [
        'HTML fundamentals',
        'CSS and responsive design',
        'JavaScript fundamentals'
      ],
      about: 'This course is designed to help you improve your web development skills.'
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