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
  return response.data;
}

export async function handle({ request, resolve }) {
  const cookies = cookie.parse(request.headers.cookie || '');

  if (typeof request.locals.user === 'undefined') {
    request.locals.user = {
      authenticated: false,
    };
  }

  const sessionInfo = await verify(cookies.session_id || null);

  request.locals.user = {
    session_id: cookies.session_id,
    authenticated: sessionInfo.isValid,
    data: {},
  };
  if (request.locals.user.authenticated) {
    request.locals.user.data = sessionInfo.session_data;
  }

  console.log(request.locals);
  // Test if path starts with "/admin"
  if (RegExp(/^(\/admin\/?)/).exec(request.path)) {
    console.log('bad', request.locals.user.type);
    if (!request.locals.user.authenticated && !(request.locals.user.type == 'Admin'))
      return {
        status: 300,
        headers: {
          location: '/',
        },
      };
  }

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
