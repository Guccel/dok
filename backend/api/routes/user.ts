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
import { sendRegisterMail } from '../helpers/mail'

//# exports
const router = Router();
export default router;

//# routes

//## POST /user/
/**
 * get list of user _ids with filter
 *
 * 200: success
 * !!400: filter is wrong !!NEEDS IMPLEMENTATION
 */
router.post('/', async (req, res) => {
  const body: user.POST_req = req.body;

  let users = [];

  if (body.method === 'all') users = await User.find();
  else if (body.method === 'user') users = await User.find({ type: 'user' });
  else if (body.method === 'admin') users = await User.find({ type: 'admin' });

  const response: user.POST_res = {
    length: users.length,
    _ids: users,
  };

  return res.status(200).json(response);
});

//## POST /user/get/:_id
/**
 * get more info on a specific user using an _id
 *
 * 200: success
 * 400: bad req
 * 404: _id does not exist
 */
router.post('/get/:_id', async (req, res) => {
  const _id: string = req.params._id;
  const body: user.get.POST_req = req.body;

  if (!['all', 'basic'].includes(body.method)) return res.status(400).json(); // returns if bad req

  let response: user.get.POST_res = {};
  if (body.method === 'basic') response = await User.findById(_id).select('_id username email type');
  else if (body.method === 'all') response = await User.findById(_id);

  if (response === {}) return res.status(404).json();
  return res.status(200).json(response);
});

//## PATCH /user/patch/:_id
// !!NEEDS TO BE REDONE
// !!-will not throw err if field is not used, thus removing the data from user object
/**
 * edits user with given _id
 *
 * 200: success
 * 400: invalid edit query !!NEEDS IMPLEMENTATION
 * 404: _id does not exist !!NEEDS IMPLEMENTATION
 */
router.patch('/patch/:_id', async (req, res) => {
  const _id: string = req.params._id;
  const body: user.patch.POST_req = req.body;
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
/**
 * creates a user with given data
 *
 * 201: created successfully
 * 409: username or email already used
 */
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
  new User({
    username: body.username,
    email: body.email,
    password: password_hashed,
    salt,
  }).save();

  // Send verification email
  sendRegisterMail(body.email);

  return res.status(201).json();
});

//## POST /user/login
/**
 * handles user login
 *
 * 201: logged in successfully
 * 231: user exists but password incorrect
 * 404: username not found
 */
router.post('/login', async (req, res) => {
  const body: user.login.POST_req = req.body;

  const user = await User.findOne({ username: body.username }).select('email type password salt'); // gets user data

  if (!user) return res.status(404).json(); // returns if username does not exist

  if (user.password !== scryptSync(body.password, user.salt, 64).toString('hex')) return res.status(260).json(); // returns if encrypted body password does not match encrypted user password

  //TODO implement better handling for if user already has session
  Session.findOneAndDelete({ email: user.email });

  const session_id = login(user); // login and create _id

  return res.status(201).json({ _id: session_id });
});

//## GET /user/login-with-id/:_id
/**
 * logs in user using session_id
 *
 */
router.get('/login-with-id/:_id', async (req, res)=> {
  const _id: string = req.params._id;

})