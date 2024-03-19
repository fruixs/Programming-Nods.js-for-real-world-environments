// binding modules
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
// declare task shema
var taskSchema = new Schema({
    date: String,
    contents: String
});

// exports model for task-controller
module.exports = mongoose.model('Task', taskSchema);