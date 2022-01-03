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
<<<<<<< HEAD
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
=======
    type: 'user' | 'admin';
    password: string;
  } = req.body;

  // Check to see if the username is taken
  await User.findOne({ username: body.username })
    .exec()
    .then((isUsername: object) => {
      if (isUsername) return res.status(409).json({ msg: 'username exists' });
    });

  // Check to see if the email is already registered
  await User.findOne({ email: body.email })
    .exec()
    .then((isEmail: object) => {
      if (isEmail) return res.status(409).json({ msg: 'email exists' });
    });

  // Encrypt
  const salt = randomBytes(16).toString('hex');
  const password_hashed = scryptSync(body.password, salt, 64).toString('hex');

>>>>>>> main
  new User({
    username: body.username,
    email: body.email,
    password: password_hashed,
    salt,
  }).save();

<<<<<<< HEAD
  return res.status(201).json();
=======
  return res.status(201);
>>>>>>> main
});
