const mongoose = require('mongoose');
var TodoSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  priority : {
     type: Number,
     min: 0,
     max: 2 }
,
  location : {
    type : String,
    required : true
  },
});
mongoose.model('Todo',TodoSchema);
module.exports = mongoose.model('Todo');
