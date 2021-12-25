//# imports
const express = require('express');
const Session = require('../models/session');
const session_helpers = require('../helpers/session');
const { scryptSync } = require('crypto');
const uuid = require('uuid');
router = express.Router();

//# /session

//## POST /verify
router.post('/verify', async (req, res) => {
  body = req.body;
  if (!body) return res.status(200).json({ isValid: false });
  const out = await session_helpers.verify(body.session_id);
  console.log(out);
  return res.status(200).json(out);
});

//## POST /login
router.post('/login', async (req, res) => {
  body = req.body;

  // Check to see if the username exists
  const user = await User.findOne({ username: body.username });
  if (!user) {
    return res.status(404).json({
      success: false,
      msg: 'Username not found',
    });
  }

  const hashedBuffer = scryptSync(body.password, user.salt, 64).toString('hex');
  if (hashedBuffer != user.password) {
    return res.status(400);
  }

  //TODO implement better handling for if user already has session
  Session.findOneAndDelete({ email: user.email });

  const _id = uuid.v4();
  const session = new Session({
    _id,
    email: user.email,
    type: user.type,
  });

  await session.save().catch((err) => {
    console.log(err);
  });

  return res.status(200).json({
    success: true,
    session_id: _id,
    session_data: {
      email: user.email,
      type: user.type,
    },
  });
});

//# exports
module.exports = router;
