const crypto = require('crypto');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      default: 'User',
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model('users', UserSchema);
