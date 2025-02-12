import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL + '/deck',
});

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
