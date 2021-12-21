import axios from 'axios';
import Cookies from 'js-cookie';

export async function login(data) {
  const response = await axios({
    method: 'POST',
    url: 'http://localhost:3000/session/login',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  });
  console.log(response.data);
  return response.data;
}

export async function setCookie(session_id) {
  Cookies.set('session_id', session_id, {
    sameSite: 'lax',
  });
}
