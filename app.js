var express = require('express');
var app = express();
var db = require('./db'); //ADD THIS LINE
// var passport = require('./paspport');
const passport    = require('passport');

  require('./paspport');
const register = require('./Controller/RegisterController');
const auth = require('./Routes/auth');
const user = require('./Routes/User');
app.use('/register', register);
app.use('/', auth)
// app.use('/user',passport.authenticate('jwt',{session : false},user));
app.use('/user', passport.authenticate('jwt', {session: false}), user);

module.exports = app;
