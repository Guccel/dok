const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport')

const User = require('../models/user')

const key = process.env.KEY;
const router = express.Router();

router.post('/register', async function(req, res){

  // Data from the POST
  let {
    username,
    email,
    password,
    confirm_password
  } = req.body

  // Check to see if passwords match
  if(password !== confirm_password){return res.status(400).json({msg: "Passwords do not match"})} 

  // Check to see if the username is taken
  const isUser = await User.findOne({"username": username})
  if (isUser) {
    return res.status(400).json({
      msg: "Username already registered : " + username
    })
  }

  // Check to see if the email is already registered
  const isEmail = await User.findOne({"email": email})
  if (isEmail) {
    return res.status(400).json({
      msg: "Email already registered : " + email
    })
  }
  
  const newUser = new User({
      username,
      email,
      password
  })
  
  // Encrypt and send
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
  
      newUser.password = hash;
      newUser.save().then(user => {
        return res.status(201).json({
          success: true,
          msg: "User is now registered"
        })
      })
    })
  })
})

router.post('/login', async function(req, res){
  
  // Check to see if the username exists
  User.findOne({"username": req.body.username}).then(user => {
    if(!user){
      return res.status(404).json({
        success: false, 
        msg:"Username not found"
      })
    }  

    // Check to see it the passwords match
    bcrypt.compare(req.body.password, user.password).then(isMatch => {
      if(isMatch){
        const payload = {
          _id: user._id,
          username: user.username,
          email: user.email
        }
    
        jwt.sign(payload, key, (err, token) => {
          res.status(200).json({
            success: true,
            msg: "You are logged in!",
            token: token
          })
        })
      }
      else{return res.status(404).json({
        success: false, 
        msg:"Incorrect password"}
      )}
    })
  })
})

module.exports = router;