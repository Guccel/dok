const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../models/user');
const verify = require('./verfiyToken');

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
  await User.findOne({ username: req.body.username })
    .exec()
    .then((isUser) => {
      if (!isUser) cred_res.username = true;
    });

  // Check to see if the email is already registered
  await User.findOne({ email: req.body.email })
    .exec()
    .then((isEmail) => {
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
          type: user.type,
          username: user.username,
          email: user.email,
        };

        //let token = await getToken
        //res.header('auth', token).send(token);

        async () => {
          jwt.sign(payload, key, (err, token) => {
            res.header('auth', token).send(token);
            console.log(token)
            return token
          });
          return res.status(404)
        }
        
      } else {
        return res.status(404).json({
          success: false,
          msg: 'Incorrect password',
        });
      }
    });
  });
});

async function getToken(){
  
  return null
}

// Return logged in users details
router.get('/myAccount', verify, async (req, res) => {
  user = jwt.decode(req.header('auth'))

  return res.status(200).json({
    type: user.type,
    username: user.username,
    email: user.email
  })
})

module.exports = router;
