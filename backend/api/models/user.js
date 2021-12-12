const crypto = require('crypto');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: 'User',
    },
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
    password: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.validatePassword = function (password) {
  let _password = crypto.pbkdf2Sync(password, env.salt, 10000, 32, 'sha512').toString('hex');
  return this.password === _password;
};

UserSchema.methods.setPassword = function (password) {
  this.password = crypto.pbkdf2Sync(password, env.salt, 10000, 32, 'sha512').toString('hex');
};

module.exports = User = mongoose.model('users', UserSchema);
