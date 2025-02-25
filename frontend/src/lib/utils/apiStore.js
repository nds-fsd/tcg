import axios from 'axios';
import { getUserToken } from './localStorage.utils';

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL + '/store',
});

export const getProducts = async () => {
  try {
    const response = await API.get('/products');
    return response.data;
  } catch (error) {
    return [];
  }
};

const buyProduct = async (endpoint, productId) => {
  const token = getUserToken();

  if (!token) {
    return null;
  }

  try {
    const response = await API.post(
      `/products/${productId}/${endpoint}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return response.data.newBalance;
  } catch (error) {
    return null;
  }
};

export const buyChest = (productId) => buyProduct('buy-chest', productId);
export const buyCurrency = (productId) => buyProduct('buy-currency', productId);
