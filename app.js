require('dotenv').config();
require('./app_api/models/db');

var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var mongoose = require('mongoose');

var indexRouter = require('./app_server/routes/index');
var apiRoutes = require('./app_api/routes/index');

var app = express();

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

app.use(cors({
  origin: 'http://localhost:4200'
}));

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: 'auto'
  }
}));

passport.use(mongoose.model('User').createStrategy());
passport.serializeUser(mongoose.model('User').serializeUser());
passport.deserializeUser(mongoose.model('User').deserializeUser());

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/build', express.static(path.join(__dirname, 'public', 'build')));
app.use('/angular', express.static(
  path.join(__dirname, 'learninghub-public', 'dist', 'learninghub-public', 'browser')
));

app.use('/', indexRouter);
app.use('/api', apiRoutes);

app.get(['/angular', '/angular/*'], function(req, res) {
  res.sendFile(path.join(
    __dirname,
    'learninghub-public',
    'dist',
    'learninghub-public',
    'browser',
    'index.html'
  ));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
