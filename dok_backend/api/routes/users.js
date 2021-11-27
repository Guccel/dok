const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../models/user');

const key = process.env.KEY;
const router = express.Router();

//# /users

//## POST /register
router.post('/register', async (req, res) => {
  cred_res = {
    username: false,
    email: false,
    password: false,
    confirm_password: false,
  };

  // Check to see if the username is taken
  await User.findOne({ username: req.body.username }).then((isUser) => {
    if (!isUser) cred_res.username = true;
  });

  // Check to see if the email is already registered
  await User.findOne({ email: req.body.email }).then((isEmail) => {
    if (!isEmail) cred_res.email = true;
  });

  //todo Add password requirements
  cred_res.password = true;

  // Check to see if passwords match
  if (req.body.password === req.body.confirm_password) {
    cred_res.confirm_password = true;
  }

  if (!Object.values(cred_res).every((value) => value === true)) {
    return res.status(400).json({
      success: false,
      msg: cred_res,
    });
  }

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: null,
  });

  // Encrypt and send
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      newUser.password = hash;
      newUser.save().then(() => {
        return res.status(201).json({
          success: true,
          msg: 'User is now registered',
        });
      });
    });
  });
});

//## POST /login
router.post('/login', async (req, res) => {
  // Check to see if the username exists
  User.findOne({ username: req.body.username }).then((user) => {
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: 'Username not found',
      });
    }

    // Check to see it the passwords match
    bcrypt.compare(req.body.password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          _id: user._id,
          username: user.username,
          email: user.email,
        };

        jwt.sign(payload, key, (err, token) => {
          console.log(token);
          res.status(200).json({
            success: true,
            msg: 'You are logged in!',
            token: token,
          });
        });
      } else {
        return res.status(404).json({
          success: false,
          msg: 'Incorrect password',
        });
      }
    });
  });
});

module.exports = router;
