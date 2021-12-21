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
  console.log(body);
  const out = await session_helpers.verify(body.session);
  return res.status(200).json({ out });
});

//## POST /login
router.post('/login', async (req, res) => {
  body = req.body;
  console.log(body);

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
  });
});

//# exports
module.exports = router;
