var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('passport');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('.routes/auth');

var app = express();

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  clientID: '710030085291-l9h2nudhr72uoaoqr07qeoqn46a2jh8i.apps.googleusercontent.com',
  clientSecret: 'em5nL7TWBXFgqt3d7ELXeCUo',
  callbackURL: 'http://localhost:3000/auth/google/callback'
  },

  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googelId: profile.id}, function(err, user) {
      return cb(err, user);
    });
  }
));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// passport middleware
app.use(session({secret: 'anythingSecretThing'}));

app.use(passport.initialize());
app.use(passport.session());

// place user object into the session
passport.serializeUser(function(user, done) {
  done(null, user);
});

// pull user out of the session
passport.deserializeUser(function(user, done) {
  done(null, userId);
});

app.use('/', routes);
app.use('/users', users);
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
