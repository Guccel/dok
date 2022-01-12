/**
 * Theses routes will handle everything to do with users and handling user details
 */

//# imports
import { Router } from 'express';
import { scryptSync, randomBytes } from 'crypto';
import User from '../models/user';
import { T_Routes } from 'types';

//# exports
const router = Router();
export default router;

//# routes

//## POST /user/
/**
 * get list of user _ids with filter
 *
 * 200: success
 * 400: filter is wrong !!NEEDS IMPLEMENTATION
 */
router.post('/', async (req, res) => {
  const body: T_Routes.user.POST_req = req.body;

  let users = [];

  if (body.method === 'all') users = await User.find();
  else if (body.method === 'user') users = await User.find({ type: 'user' });
  else if (body.method === 'admin') users = await User.find({ type: 'admin' });

  const response: T_Routes.user.POST_res = {
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
  const body: T_Routes.user.get.POST_req = req.body;

  if (!['all', 'basic'].includes(body.method)) return res.status(400).json(); // returns if bad req

  let response: T_Routes.user.get.POST_res = {};
  if (body.method === 'basic') response = await User.findById(_id).select('_id username email type');
  else if (body.method === 'all') response = await User.findById(_id);

  if (response === {}) return res.status(404).json();
  return res.status(200).json(response);
});

//## PATCH /user/patch/:_id
// !!NEEDS TO BE REDONE
//!!-will not throw err if field is not used, thus removing the data from user object
/**
 * edits user with given _id
 *
 * 200: success
 * 400: invalid edit query !!NEEDS IMPLEMENTATION
 * 404: _id does not exist !!NEEDS IMPLEMENTATION
 */
router.patch('/patch/:_id', async (req, res) => {
  const _id: string = req.params._id;
  const body: T_Routes.user.patch.POST_req = req.body;
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
  if (doesUsernameExist || doesEmailExist) return res.status(409).json(); // check if username or password registered and send res if true

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

  return res.status(201).json();
});
