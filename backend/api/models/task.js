//# imports
const mongoose = require('mongoose');

//# schema
const taskSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  desc: { type: String, required: true },
  author_id: { type: String, required: true },
  duration: {
    birth: { type: Date, required: true },
    span: { type: Number, required: true },
  },
});

//# exports
module.exports = mongoose.model('Task', taskSchema);
