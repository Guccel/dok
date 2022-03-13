//# imports
import { randomBytes, scryptSync } from 'crypto';
import { Router } from 'express';
import User from '../models/user';

//# exports
const router = Router();
export default router;

//# routes

router.get('/', async (req, res) => {
  const filter: 'all' | 'admin' | 'user' = req.body.filter;
  if (filter == 'all') {
    return res.status(200).json(await User.find());
  } else {
    return res.status(200).json(await User.find({ type: filter }));
  }
});

router.post('/', async (req, res) => {
  const usernameCheck = User.exists({ username: req.body.username });
  const emailCheck = User.exists({ email: req.body.email });

  //TODO convert this into an array
  if (await usernameCheck) return res.status(409).json({ value: 'username' });
  if (await emailCheck) return res.status(409).json({ value: 'email' });

  const salt = randomBytes(16).toString('hex');
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: scryptSync(req.body.password, salt, 64).toString('hex'),
    salt,
  });
  newUser.save();

  return res.status(201).json();
});
