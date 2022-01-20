import Session from '../models/session';
import { v4 as uuidv4 } from 'uuid';

export function login(user: { email: string; type: string; _id: string}): string {
	const _id = uuidv4(); // generate unique _id

  // create new session
  new Session({
    _id,
    data: {
      email: user.email,
      type: user.type,
      _id: user._id
    },
  }).save();

  return _id;
}
