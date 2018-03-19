var express = require('express');
var router= express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
var User = require('./../Model/User');
router.post('/',function(req,res){
  console.log(req.body.name);
  console.log(req.body.email);
  console.log(req.body.password);
  console.log(req.body.confPassword);
  // User.create({
  //           name : req.body.name,
  //           email : req.body.email,
  //           password : req.body.password
  //       },
  //       function (err, user) {
  //           if (err) return res.status(500).send("There was a problem adding the information to the database.");
  //           res.status(200).send(user);
  //       });
  if(req.body.name && req.body.email && req.body.password && req.body.confPassword){
      if(req.body.password !== req.body.confPassword){
        res.status(400).send('Password Doesnt Match');
      }
      else{
        console.log(req.body.name);
        User.create({
          name : req.body.name,
          email : req.body.email,
          password : req.body.password
        },
        function(err,user){
          console.log('adhisad');
          if(err) return res.status(500).send('There was a problem');
          res.status(200).send(user);
        });
      }
    }else{
      res.status(400).send('Error');
    }
  });
// router.post('/login',function(req,res,next){
//   if(req.body.email && req.body.password){
//     User.authenticate(req.body.email , req.body.password, function(err,user){
//       if(err ){
//         res.status(500).send(err);
//       }else{
//         req.session.userId = user._id;
//         return user;
//       }
//     });
//   });
//   console.log('a');
//   User.create({
//     name : req.body.name,
//     email : req.body.email,
//     password : req.body.password
//   },
//   function(err,user){
//     if(err) return res.status(500).send('There was a problem');
//     res.status(200).send(user);
//   });
// });
router.get('/',function(req,res){
  User.find({},function(err,users){
    if(err) return res.status(500).send('Ada masalah cuy');
    res.status(200).send(users);
  });
});
module.exports = router;
