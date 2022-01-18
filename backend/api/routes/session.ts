/**
 * These routes will handle all session requests
 */

//# imports
import { T_Routes } from 'types';
import { Router } from 'express';
import { verify, getData } from '../helpers/session';

//# exports
const router = Router();
export default router;

//# routes

//## POST /session/verify
/**
 * checks if session currently exists
 *
 * 230: session exists
 * 231: session does not exist
 * 400: bad req
 */
router.post('/verify', async (req, res) => {
  const body: T_Routes.session.verify.POST_req = req.body;

  if (!body) return res.status(40); // return if bad request
  if (await verify(body.session_id)) return res.status(230).json();
  // returns if session exists
  else return res.status(231).json(); // returns if session does not exist
});

//## POST /session/get-data
/**
 * gets data for a specific session id
 *
 * 200: success
 * 400: bad req
 * 404: session does not exist
 */
router.post('/get-data', async (req, res) => {
  const body: T_Routes.session.getData.POST_req = req.body;

  if (!body) return res.status(400); // return if bad request
  if (!(await verify(body.session_id))) return res.status(404).json(); // returns if session does not exist
  const response: T_Routes.session.getData.POST_res = await getData(body.session_id); // fetches session data
  return res.status(200).json(response); // returns session data
});
