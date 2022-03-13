import { Router } from 'express';

const routes: Router = Router();
export default routes;

//# routes /
// import session_routes from './api/routes/session';
// routes.use('/session', session_routes);

import user_routes from './api/routes/user';
routes.use('/user', user_routes);
