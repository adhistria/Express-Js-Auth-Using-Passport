const express = require('express');
const router = express.Router();
const Todo = require('./../Model/Todo');
var User = require('./../Model/User');
module.exports = {
  create : function(req,res){
    if(req.body.name && req.body.priority && req.body.location){
        console.log(req.body.name);
        const todo = new Todo(req.body);
        // console.log(todo);
        //
        // Todo.create({
        //   name : req.body.name,
        //   priority : req.body.email,
        //   location : req.body.location,
        // },

        // const user = User.findById(req.user._id);
        User.findOne({_id: req.user._id}, function (err, user) {
          if(err) res.send('gagal') ;
          console.log(user);
          user.todos.push(todo);
          user.save();
         });

        console.log(req.user._id);
        todo.save();
        res.status(400).send('sukses');
        // user.todos.push(todo);

        // ,
        // function(err,todo){
        //   console.log('adhisad');
        //   if(err) return res.status(500).send('There was a problem');
        //   res.status(200).send(todo);
        // }
      // );
      }
      else{
          res.status(400).send("Error");
        }
  },
  get : function(req,res,next) {
    // const userId = req.user._id;
    User.findOne({ _id : req.user._id }).populate('todos').exec(function (err, user) {
      if (err) return handleError(err);
      res.status(200).send(user.todos);
      // console.log('The author is %s', user.todos);
      // prints "The author is Ian Fleming"
    });
    // User.findOne({_id: req.user._id}.populate('todos'), function (err, user) {
    //   // user.populate('todos');
    //   // console.log(user.todos);
    //   // res.status(200).json(user.todos);
    // });
    // res.status(200).json(USER.todos);

  }

}
// });
// };
