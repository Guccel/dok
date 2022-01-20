/**
 * Theses routes will handle everything to do with users and handling user details
 */

//# imports
import { Router } from 'express';
import { scryptSync, randomBytes } from 'crypto';
import User from '../models/user';
import { user } from 'T_routes';
import Session from '../models/session';
import { v4 as uuidv4 } from 'uuid';
import { login } from '../helpers/user';
import { sendRegisterMail } from '../helpers/mail';

//# exports
const router = Router();
export default router;

//# routes

//## POST /user/
router.post('/', async (req, res) => {
  const body: {
    filter: 'all' | 'user' | 'admin';
    // filter?: null;
  } = req.body;

  let users = [];

  if (body.filter === 'all') users = await User.find();
  else if (body.filter === 'user') users = await User.find({ type: 'user' });
  else if (body.filter === 'admin') users = await User.find({ type: 'admin' });

  const response: {
    length: number;
    _ids: string[];
  } = {
    length: users.length,
    _ids: users,
  };

  return res.status(200).json(response);
});

//## POST /user/get/:_id
router.post('/get/:_id', async (req, res) => {
  const _id: string = req.params._id;
  const body: {
    filter: 'basic' | 'all';
  } = req.body;

  if (!['all', 'basic'].includes(body.filter)) return res.status(400).json(); // returns if bad req

  let response: {
    [key: string]: any; // dunno how to fill these types yet
  } = {};
  if (body.filter === 'basic') response = await User.findById(_id).select('_id username email type');
  else if (body.filter === 'all') response = await User.findById(_id);

  if (response === {}) return res.status(404).json();
  return res.status(200).json(response);
});

//## PATCH /user/patch/:_id
// !!NEEDS TO BE REDONE
// !!-will not throw err if field is not used, thus removing the data from user object
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

//## POST /user/register
router.post('/register', async (req, res) => {
  const body: {
    username: string;
    email: string;
    password: string;
  } = req.body;

  const doesUsernameExist: boolean = (await User.findOne({ username: body.username })) ? true : false; // check to see if the username is taken
  const doesEmailExist: boolean = (await User.findOne({ email: body.email })) ? true : false; // check to see if the email is already registered
  if (doesUsernameExist || doesEmailExist) return res.status(409).json(); // check if username or password registered and return if true

  // encrypt password
  const salt = randomBytes(16).toString('hex');
  const password_hashed = scryptSync(body.password, salt, 64).toString('hex');

  // save new user
  let newUser = new User({
    username: body.username,
    email: body.email,
    password: password_hashed,
    salt,
  })
  
  newUser.save();

  const session_id = login({ email: body.email, type: 'User', _id:newUser._id}); // login and create _id

  // Send verification email
  sendRegisterMail(body.email, session_id);

  return res.status(201).json({ _id: session_id });
});

//## POST /user/login
router.post('/login', async (req, res) => {
  const body: {
    username: string;
    password: string;
  } = req.body;

  const user = await User.findOne({ username: body.username }).select('email type password salt _id'); // gets user data

  if (!user) return res.status(404).json(); // returns if username does not exist

  if (user.password !== scryptSync(body.password, user.salt, 64).toString('hex')) return res.status(260).json(); // returns if encrypted body password does not match encrypted user password

  //TODO implement better handling for if user already has session
  Session.findOneAndDelete({ email: user.email, _id: user._id});

  const response: {
    _id: string;
  } = {
    _id: login(user), // login and create _id
  };

  return res.status(201).json(response);
});
