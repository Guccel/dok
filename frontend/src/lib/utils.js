import axios from 'axios';

export async function post(endpoint, data) {
  console.log(data);
  const response = await axios({
    method: 'POST',
    url: 'http://localhost:3000/auth/login',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  });
  console.log(response.data);
  return response.data;
}

export function apost(endpoint, data) {
  return fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((r) => {
    return r.json();
  });
}
