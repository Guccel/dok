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

