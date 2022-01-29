/**
 * These routes handle todo stuff
 */

//# imports
import { Router } from 'express';
import Todo from '../models/todo';

//# exports
const router = Router();
export default router;

//# routes

//## POST /
router.post('/', async (req, res) => {
  const body: {
    filter: String;
  } = req.body;
  //TODO implement filter
  const todo_ids: any = await Todo.find().select('_id');
  const _ids = todo_ids.map((x: { _id: string }) => x._id);
  const response: {
    length: number;
    _ids: string[];
  } = { length: todo_ids.length, _ids };
  return res.status(200).json(response);
});

//## POST /get/:_id
router.post('/get/:_id', async (req, res) => {
  const _id: string = req.params._id;
  let response: any;
  response = await Todo.findById(_id);
  if (!response) return res.status(404);

  return res.status(200).json(response);
});
