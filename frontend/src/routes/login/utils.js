import { login, setCookie, logout } from '$lib/login/utils.js';
import Cookies from 'js-cookie';

import { session } from '$app/stores';

export async function login_submit(values) {
  const response = await login({
    username: values.username,
    password: values.password,
  });

  if (response.success) {
    setCookie(response.session_id);

    session.update((store) => ({
      ...store,
      user: {
        authenticated: true,
        session_id: response.session_id,
      },
    }));
  }
}

export function logout_submit() {
  logout();

  session.update((store) => ({
    ...store,
    user: {
      authenticated: false,
      session_id: '',
    },
  }));
}
