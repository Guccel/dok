//# imports
import { Router } from 'express';
import Session from '../models/session';
import User from '../models/user';
import { verify, getData } from '../helpers/session';
import { scryptSync } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

//# exports
const router = Router();
export default router;

//# verify session_id
router.post('/verify', async (req, res) => {
  const body: {
    session_id: string;
  } = req.body;

  if (!body) return res.status(404);
  const out = await verify(body.session_id);
  return res.status(200).json(out);
});

//# get session data
router.post('/get-data', async (req, res) => {
  const body: {
    session_id: string;
  } = req.body;

  if (!body) return res.status(404);
  const out = await getData(body.session_id);
  return res.status(200).json(out);
});

//# login user
router.post('/login', async (req, res) => {
  const body: {
    username: string;
    password: string;
  } = req.body;

  // Check to see if the username exists
  const user = await User.findOne({ username: body.username });
  if (!user) {
    return res.status(404).json({
      msg: 'username not found',
    });
  }

  // Check to see if password is correct
  if (user.password !== scryptSync(body.password, user.salt, 64).toString('hex')) {
    return res.status(260).json({
      msg: 'password incorrect',
    });
  }

  //TODO implement better handling for if user already has session
  Session.findOneAndDelete({ email: user.email });

  const _id = uuidv4();
  new Session({
    _id,
    data: {
      email: user.email,
      type: user.type,
    },
  }).save();

  return res.status(201).json({
    _id,
    data: {
      email: user.email,
      type: user.type,
    },
  });
});
