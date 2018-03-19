var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var UserSchema = new mongoose.Schema({
  name : {
    type: String,
    required : true
  },
  email :{
    type : String,
    required : true,
    unique : true,
    index : true
  },
  password : {
    type: String,
    required : true
  }
});
UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(12, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
UserSchema.methods.comparePassword = function(password) {
    if ( ! this.password ) { return false; }
    return bcrypt.compareSync( password, this.password );
};


// UserSchema.pre('save', function(next) {
//     var user = this;
//
//     // only hash the password if it has been modified (or is new)
//     if (!user.isModified('password')) return next();
//
//     // generate a salt
//     bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
//         if (err) return next(err);
//
//         // hash the password using our new salt
//         bcrypt.hash(user.password, salt, function (err, hash) {
//             if (err) return next(err);
//
//             // set the hashed password back on our user document
//             user.password = hash;
//             next();
//         });
//     });
// });

// UserSchema.methods.comparePassword = function(candidatePassword, cb) {
//     bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//         if (err) return cb(err);
//         cb(null, isMatch);
//     });
// };

// UserSchema.methods.comparePassword = function(otherPassword, cb) {
//     bcrypt.compare(otherPassword, this.password, function(err, isMatch) {
//         if (err) return cb(err);
//         cb(null, isMatch);
//     });
//     // bcrypt.compare(otherPassword, this.password, function(err, res) {
//     //     if(err) return res(err);
//     //     return res(null,res);
//     // });
// };


mongoose.model('User',UserSchema);
module.exports = mongoose.model('User');
//
// var mongoose = require('mongoose');
// var UserSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String
// });
// mongoose.model('User', UserSchema);
// module.exports = mongoose.model('User');
