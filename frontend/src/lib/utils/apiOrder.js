import axios from 'axios';
import { getUserToken } from './localStorage.utils';

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL + '/store',
});

export const getUserOrders = async () => {
  const token = getUserToken();

  if (!token) {
    console.error('Error: Usuario no autenticado.');
    return null;
  }

  try {
    const response = await API.get('/orders', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('Error al obtener el historial de compras:', error);
    return null;
  }
};