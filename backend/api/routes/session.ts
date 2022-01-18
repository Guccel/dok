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

//## GET /session/verify/:session_id
/**
 * checks if session currently exists
 *
 * 200: session exists
 * 400: bad slug
 * 404: session does not exist
 */
router.get('/verify/:session_id', async (req, res) => {
  const session_id: string = req.params.session_id;

  if (!session_id) return res.status(400); // return if bad request
  if (await verify(session_id)) return res.status(200).json();
  // returns if session exists
  else return res.status(404).json(); // returns if session does not exist
});

//## GET /session/get-data/:session_id
/**
 * gets data for a specific session id
 *
 * 200: success
 * 400: bad slug
 * 404: session does not exist
 */
router.get('/get-data/:session_id', async (req, res) => {
  const session_id: string = req.params.session_id;

  if (!session_id) return res.status(400); // return if bad request
  if (!(await verify(session_id))) return res.status(404).json(); // returns if session does not exist
  const response: session.getData.GET_res = await getData(session_id); // fetches session data
  return res.status(200).json(response); // returns session data
});
