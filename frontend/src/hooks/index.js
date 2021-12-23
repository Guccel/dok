import * as cookie from 'cookie';
import axios from 'axios';

async function verify(session_id) {
  const response = await axios({
    method: 'POST',
    url: 'http://localhost:3000/session/verify',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { session_id },
  });
  return response.data.isValid;
}

export async function handle({ request, resolve }) {
  const publicPages = ['/', '/about', '/login'];

  const cookies = cookie.parse(request.headers.cookie || '');

  if (typeof request.locals.user === 'undefined') {
    request.locals.user = {
      authenticated: false,
    };
  }

  request.locals.user = cookies;
  request.locals.user.authenticated = cookies.session_id ? true : false;

  const response = await resolve(request);

  return {
    ...response,
  };
}

export function getSession(request) {
  const user = request.locals.user;
  return {
    user,
  };
}
