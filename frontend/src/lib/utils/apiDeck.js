import axios from 'axios';
import { getUserToken } from './localStorage.utils';

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL + '/deck',
});

export const getUserDecks = async () => {
  try {
    const token = getUserToken();
    console.warn("⚠️ No hay token disponible para la solicitud.");
    if (!token) return [];

    console.log("📌 Enviando solicitud para obtener mazos...");
    const response = await API.get('/user', {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("📌 Respuesta de la API:", response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error al obtener los mazos del usuario:', error);
    return [];
  }
};

export const createDeck = async (deckData, token) => {
  try {
    const response = await API.post('/', deckData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al crear el mazo:', error);
    throw new Error(error.response?.data?.error || 'Error al crear el mazo.');
  }
};
