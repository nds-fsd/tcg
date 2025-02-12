import axios from 'axios';
import { getUserToken } from './localStorage.utils';

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
});

export const getProducts = async () => {
  try {
    const response = await API.get('/store');
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return [];
  }
};

export const buyChest = async (productId) => {
  const token = getUserToken();

  if (!token) {
    console.error('Error: Usuario no autenticado.');
    return null;
  }

  try {
    const response = await API.post(
      `/store/buy/chest/${productId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error al comprar el cofre:', error);
    return null;
  }
};

export const buyCurrency = async (productId) => {
  const token = getUserToken();

  if (!token) {
    console.error('Error: Usuario no autenticado.');
    return null;
  }

  try {
    const response = await API.post(
      `/store/buy/currency/${productId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error al comprar el pack de Pixelcoins:', error);
    return null;
  }
};
