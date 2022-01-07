//# imports
import { Router } from 'express';
import { scryptSync, randomBytes } from 'crypto';
import User from '../models/user';

//# exports
const router = Router();
export default router;

//# get all users
router.post('/', async (req, res) => {
  const body: {
    method: 'all' | 'user' | 'admin';
  } = req.body;
  let users = [];
  if (body.method === 'all') users = await User.find();
  else if (body.method === 'user') users = await User.find({ type: 'user' });
  else if (body.method === 'admin') users = await User.find({ type: 'admin' });
  const response: {
    length: number;
    users: string[];
  } = { length: users.length, users };
  return res.status(200).json(response);
});

//# get more info on user
router.post('/get/:_id', async (req, res) => {
  const _id: string = req.params._id;
  const body: {
    method: 'basic' | 'all';
  } = req.body;
  let response: any;
  if (body.method === 'basic') response = await User.findById(_id).select('_id username email type');
  else if (body.method === 'all') response = await User.findById(_id);
  return res.status(200).json(response);
});

//# edit user
router.patch('/patch/:_id', async (req, res) => {
  const _id: string = req.params._id;
  const body: {
    username?: string;
    email?: string;
    type?: 'user' | 'admin';
  } = req.body;
  await User.findOneAndUpdate(
    { _id },
    {
      username: body.username,
      email: body.email,
      type: body.type,
    }
  );
  return res.status(200).json();
});

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
    return res.status(260).json();
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
