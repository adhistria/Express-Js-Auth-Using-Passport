const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
// const bodyParser = require('body-parser')
// router.use(bodyParser.urlencoded({extended: true}));
// router.use(bodyParser.json());
// app.post('/login',
//   passport.authenticate('local', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   });
// app.post('/profile', passport.authenticate('jwt', { session: false }),
//     function(req, res) {
//         res.send(req.user.profile);
//     }
// );


// router.post('/login', function (req, res, next) {
//   // console.log(req.body.email);
//     passport.authenticate('local', {session: false}, (err, user, info) => {
//         // console.log(req.body.email);
//         if (err || !user) {
//             return res.status(400).json({
//                 message: info ? info.message : 'Login failed',
//                 user   : user
//             });
//         }
//         req.login(user, {session: false}, (err) => {
//             console.log('adhisa');
//             if (err) {
//                 res.send(err);
//             }
//             console.log('successs');
//             // var token = jwt.sign({ foo: 'bar' }, cert, { algorithm: 'RS256'});
//
//             const token = jwt.sign(user, 'your_jwt_secret');
//
//             return res.json({user, token});
//         });
//     })
//     (req, res);
//
// });



router.post('/login', function(req,res,next){
  passport.authenticate('local', { session : false }, function (err,user,info){
    if(err || !user){
      console.log(err);
      return res.status(400).json({
        message : ('Something Wrong When Login'),
        user : user,
        err : err
    });
  }
  req.login(user,{session : false},function (err){
    if(err){
      res.send(err);
    }
    // const token = jwt.sign({foo:'bar'} , 'secret');
    return res.json({ token: jwt.sign({id: user.id}, 'secret',{expiresIn: 3600} ) });

    // const token = jwt.sign({data: user}, {
    //      expiresIn: 604800 // 1 week
    //    });
    //
    //    res.json({
    //      success: true,
    //      token: `Bearer ${token}`,
    //      user: {
    //        id: user._id,
    //        name: user.name,
    //        username: user.username,
    //        email: user.email
    //      }
    //    });
    // console.log('asdasd boy');
    // return res.json({user});
    // return res.json({user,token});
  });

})(req,res);
});

// router.post('/', (req, res, next) => {
//   const username = req.body.username;
//   const password = req.body.password;
//
//   User.getUserByUsername(username, (err, user) => {
//     if(err) throw err;
//     if(!user){
//       return res.json({success: false, msg: 'User not found'});
//     }
//
//     User.comparePassword(password, user.password, (err, isMatch) => {
//       if(err) throw err;
//       if(isMatch){
//         const token = jwt.sign({data: user}, config.secret, {
//           expiresIn: 604800 // 1 week
//         });
//
//         res.json({
//           success: true,
//           token: `Bearer ${token}`,
//           user: {
//             id: user._id,
//             name: user.name,
//             username: user.username,
//             email: user.email
//           }
//         });
//       } else {
//         return res.json({success: false, msg: 'Wrong password'});
//       }
//     });
//   });
// });


module.exports = router;
// app.post('/register',function(req,res,next){
//   user.
// })
