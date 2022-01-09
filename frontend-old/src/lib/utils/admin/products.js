import axios from 'axios';

import { session } from '$app/stores';

export async function getProducts() {
  const response = await axios({
    method: 'GET',
    url: 'http://localhost:3000/admin/products',
  });
  const data = response.data;
  return data;
}
