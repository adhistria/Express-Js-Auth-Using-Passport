const express = require('express');
const router = express();
const User = require('./../Model/User');
const Todo = require('./../Model/Todo');
// require('../Paspport');
  // const JWTStrategy   = require("passport-jwt").Strategy;
exports.getUser = function(req,res,next){
  res.send(req.user);
};
exports.getId = function(req,res,next){
  console.log(req.user._id);
}
exports.todo = async(req,res,next) => {
  const newTodo = new Todo(req.body);
  console.log(newTodo);
  console.log(req.user._id);
  // User.findBy
}
// exports.
// module.exports = {
//   newUserTodo = async(req,res,next) => {
//     const newTodo = new()
//
//   }
// }

// router.get('/profile', function(req, res, next) {
//   res.send(req.user);
// });
//
//   /* GET user profile. */
// router.get('/profile', function(req, res, next) {
//     res.send(req.user);
// });
// module.exports = router;
