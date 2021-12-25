import axios from 'axios';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

import { session } from '$app/stores';

export async function login_submit(values) {
  const response = await axios({
    method: 'POST',
    url: 'http://localhost:3000/session/login',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      username: values.username,
      password: values.password,
    },
  });

  if (response.data.success) {
    Cookies.set('session_id', response.data.session_id, {
      sameSite: 'lax',
    });

    // Update session with current user data
    session.update((store) => ({
      ...store,
      user: {
        authenticated: true,
        session_id: response.data.session_id,
        data: response.data.session_data,
      },
    }));
  }
}

export function logout_submit() {
  //TODO add logout route in backend

  Cookies.remove('session_id');

  // Update session with default data
  session.update((store) => ({
    ...store,
    user: {
      authenticated: false,
      session_id: '',
      data: {},
    },
  }));
}

export async function register_submit(values) {
  const unique = uuidv4();
  const register_response = await axios({
    method: 'POST',
    url: 'http://localhost:3000/user/register',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      username: values.username,
      email: values.email,
      password: values.password,
      password_confirm: values.password_confirm,
    },
  });

  const data = register_response.data;

  // Log new user in
  if (data.success) {
    const login_response = await axios({
      method: 'POST',
      url: 'http://localhost:3000/session/login',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        username: values.username,
        password: values.password,
      },
    });

    Cookies.set('session_id', login_response.data.session_id, {
      sameSite: 'lax',
    });

    // Update session with current user data
    session.update((store) => ({
      ...store,
      user: {
        authenticated: true,
        session_id: login_response.data.session_id,
      },
    }));
    return { success: true };
  } else {
    let msg = '';
    if (!data.username) {
      msg = 'Username taken';
    } else if (!data.email) {
      msg = 'Email already registered';
    } else if (!data.password) {
      msg = 'Password weak';
    } else if (!data.password_confirm) {
      msg = 'Passwords do not match';
    }
    return {
      success: false,
      msg,
    };
  }
}
