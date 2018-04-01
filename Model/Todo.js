const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var TodoSchema = new Schema({
  name : {
    type : String,
    required : [true, "name is required"]
  },
  priority : {
     type: Number,
     min: 0,
     max: 2 },
  location : {
    type : String,
    required : true
  },
  creator : {
    type : Schema.ObjectId,
    ref : 'User'
  }
});
mongoose.model('Todos',TodoSchema);
module.exports = mongoose.model('Todos');
