//# imports
const express = require('express');
const jwt = require('jsonwebtoken');
const { scryptSync, randomBytes } = require('crypto');
const User = require('../models/user');

const key = process.env.KEY;
const router = express.Router();

//# /users

//## POST /register
router.post('/register', async (req, res) => {
  body = req.body;
  cred_res = {
    username: false,
    email: false,
    password: false,
    confirm_password: false,
  };

  // Check to see if the username is taken
  await User.findOne({ username: body.username })
    .exec()
    .then((isUser) => {
      if (!isUser) cred_res.username = true;
    });

  // Check to see if the email is already registered
  await User.findOne({ email: body.email })
    .exec()
    .then((isEmail) => {
      if (!isEmail) cred_res.email = true;
    });

  //todo Add password requirements
  cred_res.password = true;

  // Check to see if passwords match
  if (body.password === body.confirm_password) {
    cred_res.confirm_password = true;
  }

  if (!Object.values(cred_res).every((value) => value === true)) {
    return res.status(400).json({
      success: false,
      msg: cred_res,
    });
  }

  // Encrypt and send
  const salt = randomBytes(16).toString('hex');
  const password_hashed = scryptSync(body.password, salt, 64).toString('hex');

  const newUser = new User({
    username: body.username,
    email: body.email,
    password: password_hashed,
    salt,
  });
  newUser
    .save()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

<<<<<<< HEAD
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
=======
  return res.status(200).json(newUser);
});

//## GET /account-details
router.get('/account-details', (req, res) => {
  body = req.body;
  user = User.findById(body._id);
>>>>>>> 5e70f4a6b575df41b1daf64575776a726e2083e0

  return res.status(200).json({
    type: user.type,
    username: user.username,
    email: user.email,
  });
});

module.exports = router;
