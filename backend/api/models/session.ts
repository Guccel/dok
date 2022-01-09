//# imports
import { model, Schema } from 'mongoose';

//# schema
const sessionSchema = new Schema(
  {
    _id: { type: String, required: true },
    data: {
      email: { type: String, required: true },
      type: { type: String, default: 'User' },
    },
  },
  {
    timestamps: true,
  }
);

//# exports
const Session = model('session', sessionSchema);
export default Session;
