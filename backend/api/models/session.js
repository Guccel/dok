//# imports
const mongoose = require('mongoose');

//# schema
const sessionSchema = mongoose.Schema(
  {
    _id: { type: String, required: true },
    email: { type: String, required: true },
    type: { type: String, default: 'User' },
  },
  {
    timestamps: true,
  }
);

//# exports
module.exports = mongoose.model('Session', sessionSchema);
