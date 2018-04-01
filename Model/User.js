var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
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
  },
  todos : [{
    type : Schema.ObjectId, ref :'Todos'
  }]
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

mongoose.model('User',UserSchema);
module.exports = mongoose.model('User');
