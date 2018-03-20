var express = require('express');
var app = express();
var db = require('./db'); //ADD THIS LINE
const passport    = require('passport');
require('./paspport');
const auth = require('./Routes/Auth');
const user = require('./Routes/User');
app.use('/', auth);
app.use('/', passport.authenticate('jwt', {session: false}), user);

module.exports = app;
