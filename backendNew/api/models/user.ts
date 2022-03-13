//# imports
import { model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

//# schema
const userSchema = new Schema(
  {
    _id: { type: String, default: uuidv4() },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    type: { type: String, default: 'user' },
    password: { type: String, required: true },
    salt: { type: String },
    verified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

//# exports
const User = model('User', userSchema);
export default User;
