//# imports
import { model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

//# schema
const todoSchema = new Schema({
  _id: { type: String, default: uuidv4() },
  title: { type: String, required: true },
  desc: { type: String, required: true },
  author: { type: String, required: true },
  assign: { type: [String], default: ['null'] },
});

//# exports
const Todo = model('Todo', todoSchema);
export default Todo;
