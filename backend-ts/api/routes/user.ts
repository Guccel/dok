//# imports
import express from 'express';
import { Type_UserRegisterBody } from '../../types';
import { scryptSync, randomBytes } from 'crypto';
import User from '../models/user';

//# exports
const router = express.Router();
export default router;

//# register user
router.post('/register', async (req, res) => {
  const body: {
    username: string;
    email: string;
    password: string;
  } = req.body;

  // check to see if the username is taken
  const doesUsernameExist: boolean = (await User.findOne({ username: body.username })) ? true : false;

  // check to see if the email is already registered
  const doesEmailExist: boolean = (await User.findOne({ email: body.email })) ? true : false;

  // check if username or password registered
  if (doesUsernameExist || doesEmailExist) {
    return res.status(409).json();
  }
  // encrypt password
  const salt = randomBytes(16).toString('hex');
  const password_hashed = scryptSync(body.password, salt, 64).toString('hex');

  // save
  new User({
    username: body.username,
    email: body.email,
    password: password_hashed,
    salt,
  }).save();

  return res.status(201).json();
});
