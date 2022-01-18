//# imports
import { model, Schema } from 'mongoose';

//# schema
const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    type: { type: String, default: 'user' },
    password: { type: String, required: true },
    verified: {type: Boolean, default:false},
    salt: { type: String },
  },
  {
    timestamps: true,
  }
);

//# exports
const User = model('User', userSchema);
export default User;
