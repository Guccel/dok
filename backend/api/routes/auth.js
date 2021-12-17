//# imports
const express = require('express');
const { scryptSync, timingSafeEqual } = require('crypto');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const authHelpers = require('../helpers/auth');

const router = express.Router();

//# /auth

//## POST /verify
router.post('/verify', async (req, res) => {
  body = req.body;
  const user = await User.findById(body._id);
  const out = await authHelpers.verifyToken(body.token, user.salt);
  if (out.success) {
    res.status(200).json(out.payload);
  } else {
    res.status(400);
  }
});

//## POST /login
router.post('/login', async (req, res) => {
  body = req.body;
  // Check to see if the username exists
  User.findOne({ username: body.username }).then((user) => {
    if (!user) {
      res.status(404).json({
        success: false,
        msg: 'Username not found',
      });
    }
    const hashedBuffer = scryptSync(body.password, user.salt, 64).toString('hex');

    if (hashedBuffer == user.password) {
      const payload = {
        _id: user._id,
        type: user.type,
      };
      return res.status(200).json({
        success: true,
        jwt: authHelpers.genToken(payload, user.salt),
      });
    } else {
      return res.status(500).json({
        success: false,
        msg: 'Server Error',
      });
    }
  });
});

//# exports
module.exports = router;
