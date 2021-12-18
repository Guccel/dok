import axios from 'axios';

export async function post(data) {
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
