import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL + '/card',
});

export const fetchCards = async () => {
  try {
    const response = await API.get('/');
    const data = response.data;
    if (!Array.isArray(data)) {
      console.error('El backend no devolvió un array:', data);
      return [];
    }
    return data;
  } catch (error) {
    console.error('Error al obtener las cartas:', error);
    return [];
  }
};
export const createCard = (card) => API.post('/', card);
export const updateCard = (id, card) => API.put(`/${id}`, card);
export const deleteCard = (id) => API.delete(`/${id}`);
