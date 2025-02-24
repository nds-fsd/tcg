import axios from 'axios';
import { getUserToken } from './localStorage.utils';

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL + '/deck',
});

export const getUserDecks = async () => {
  try {
    const token = getUserToken();
    if (!token) return [];

    const response = await API.get('/user', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('Error al obtener los mazos del usuario:', error);
    return [];
  }
};

export const fetchDeck = async (deckId) => {
  try {
    const token = getUserToken();
    if (!token) return null;

    const response = await API.get(`/user/${deckId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error(`Error al obtener el mazo con ID ${deckId}:`, error);
    return null;
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

export const updateDeck = async (deckId, deckData, token) => {
  try {
    console.log("📌 Enviando actualización para el mazo con ID:", deckId);
    console.log("📌 Datos enviados:", JSON.stringify(deckData, null, 2));
    
    const response = await API.put(`/update/${deckId}`, deckData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el mazo:', error);
    throw new Error(error.response?.data?.error || 'Error al actualizar el mazo.');
  }
};
