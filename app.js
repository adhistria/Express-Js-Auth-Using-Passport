var express = require('express');
var app = express();
var db = require('./db'); //ADD THIS LINE
const passport    = require('passport');
require('./paspport');
const auth = require('./Routes/Auth');
const user = require('./Routes/User');
const todo = require('./Routes/Todo');
// app.use('/',function(req,res){
//   res.send('Welcom Tjuy');
// });
app.use('/', auth);
app.use('/', passport.authenticate('jwt', {session: false}), user);
// app.use('/', passport.authenticate('jwt', {session: false}), todo);
app.use('/', todo);
module.exports = app;
