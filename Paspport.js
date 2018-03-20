// const passport = require('passport’);
// const passport =require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// var JWTStrategy = require('passport-jwt').Strategy,
//     ExtractJWT = require('passport-jwt').ExtractJwt;

const passport    = require('passport');
const passportJWT = require("passport-jwt");

const ExtractJWT = passportJWT.ExtractJwt;
const User = require('./Model/User');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy   = passportJWT.Strategy;
var opts = {}
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

// passport.use(new LocalStrategy({
//         usernameField: 'email',
//         passwordField: 'password'
//     },
//     function (email, password, cb) {
//         //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
//         return UserModel.findOne({email, password})
//            .then(user => {
//                if (!user) {
//                    return cb(null, false, {message: 'Incorrect email or password.'});
//                }
//                return cb(null, user, {message: 'Logged In Successfully'});
//           })
//           .catch(err => cb(err));
//     }
// ));


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  },
  function(username, password, done) {
    User.findOne({ email: username }, function (err, user) {
      console.log(username,'adhi beud');
      if (err) { return done(err); }
      if (!user) { console.log('asdasdf'); return done(null, false); }
      if (!user.comparePassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));
passport.use(new JWTStrategy(opts, function(jwt_payload, done) {
    User.findOne({_id: jwt_payload._id}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));
// passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
//     // User.getUserById(jwt_payload.data._id, (err, user) => {
//     User.getUserById(jwt_payload._id, (err, user) => {
//       if(err){
//         return done(err, false);
//       }
//
//       if(user){
//         return done(null, user);
//       } else {
//         return done(null, false);
//       }
//     });
//   }));


// passport.use(new LocalStrategy({
//         usernameField: 'email',
//         passwordField: 'password'
//     },
//     function (username, password, cb) {
//       console.log('asdf');
//
//         //Assume there is a DB module pproviding a global UserModel
//         return UserModel.findOne({username, password})
//             .then(user => {
//                 if (!user) {
//                     return cb(null, false, {message: 'Incorrect email or password.'});
//                 }
//
//                 return cb(null, user, {
//                     message: 'Logged In Successfully'
//                 });
//             })
//             .catch(err => {
//                 return cb(err);
//             });
//     }
// ));
//
// passport.use(new JWTStrategy({
//         jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//         secretOrKey   : 'your_jwt_secret'
//     },
//     function (jwtPayload, cb) {
//
//         //find the user in db if needed
//         return UserModel.findOneById(jwtPayload.id)
//             .then(user => {
//                 return cb(null, user);
//             })
//             .catch(err => {
//                 return cb(err);
//             });
//     }
// ));
// view raw
// module.exports = passport;
