import axios from 'axios';

export async function getProducts(itemsPerPage, pageNumber) {
  const response = axios({
    method: 'POST',
    url: 'http://localhost:3000',
    data: {
      itemsPerPage,
      pageNumber,
    },
  });
  const data = response.data;
  if (data.success) {
  }
}
