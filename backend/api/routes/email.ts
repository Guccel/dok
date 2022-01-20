/**
 * email shit
 */
//# imports
import { Router } from 'express';
import User from '../models/user';

//# exports
const router = Router();
export default router;

//# routes
router.head('/verify/:_id', async (req, res) => {
  const user = await User.findOne({ _id: req.params._id }).select('verified'); // gets user data

  if (user.verified == false) {
    await User.findOneAndUpdate({ _id: req.params._id }, { verified: true }, { new: true, useFindAndModify: false });
    return res.status(200);
  }

  return res.status(404);
});
