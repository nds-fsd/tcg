import axios from 'axios';
import { getUserToken } from './localStorage.utils';

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL + 'friendship',
});

export const fetchUsers = async () => {
  const token = getUserToken();

  try {
    const response = await API.get('/', {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Respuesta del servidor: ', response);
    return response;
  } catch (e) {
    console.error('Error al enviar solicitud:', e);
    throw e;
  }
};

export const sendInvitation = async (friendName) => {
  const token = getUserToken();

  const response = await API.post(
    '/invitation',
    { friendName },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );
  return response;
};
