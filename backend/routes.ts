import { Router } from 'express';

const routes: Router = Router();
export default routes;

//# routes /
import product_routes from './api/routes/product';
routes.use('/product', product_routes);

import session_routes from './api/routes/session';
routes.use('/session', session_routes);

import user_routes from './api/routes/user';
routes.use('/user', user_routes);

import email_routes from './api/routes/email';
routes.use('/email', email_routes);

import todo_routes from './api/routes/todo';
routes.use('/todo', todo_routes);
