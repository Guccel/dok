/**
 * These routes will handle all session requests
 * DOES NOT HANDLE SESSION CREATION -see POST /user/login
 */

//# imports
import { session } from 'T_routes';
import { Router } from 'express';
import { verify, getData } from '../helpers/session';

//# exports
const router = Router();
export default router;

//# routes

//## HEAD /session/verify/:session_id
router.head('/verify/:session_id', async (req, res) => {
  const session_id: string = req.params.session_id;

  if (!session_id) return res.status(400); // return if bad request
  if (await verify(session_id)) return res.status(200)
  // returns if session exists
  else return res.status(404) // returns if session does not exist
});

//## GET /session/get-data/:session_id
router.get('/get-data/:session_id', async (req, res) => {
  const session_id: string = req.params.session_id;

  if (!session_id) return res.status(400); // return if bad request
  if (!(await verify(session_id))) return res.status(404).json(); // returns if session does not exist
  const response: {
    [key: string]: any;
  } = await getData(session_id); // fetches session data
  return res.status(200).json(response); // returns session data
});
