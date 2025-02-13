import axios from 'axios';
import { getUserToken } from './localStorage.utils';

const API = axios.create({
<<<<<<< HEAD
  baseURL: import.meta.env.VITE_BACKEND_API_URL + '/store',
=======
  baseURL: import.meta.env.VITE_BACKEND_API_URL + '/store/orders',
>>>>>>> ca00dcc (Add Backend for Orders (FE api, controller, entity and route))
});

export const getUserOrders = async () => {
  const token = getUserToken();

  if (!token) {
    console.error('Error: Usuario no autenticado.');
    return [];
  }

  try {
    const response = await API.get('/orders', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Error al obtener el historial de compras:', error);
    return [];
  }
};