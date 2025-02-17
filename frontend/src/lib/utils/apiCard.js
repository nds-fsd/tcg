import axios from 'axios';
import { getUserToken } from './localStorage.utils';

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

export const createCard = async (card) => {
    const token = getUserToken();
    if (!token) {
        console.errorconsole.error('Error: Usuario no autenticado. No se puede crear la carta.');
        return null;
    }
    
    try {
      const response = await API.post('/', card, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
        console.error('Error al crear la carta:', error);
        return null;
      }
  };

export const updateCard = async (id, card) => {
  const token = getUserToken();
  if (!token) {
    console.error('Error: Usuario no autenticado. No se puede actualizar la carta.');
    return null;
  }

  try {
    const response = await API.put(`/${id}`, card, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar la carta:', error);
    return null;
  }
};

export const deleteCard = async (id) => {
  const token = getUserToken();
  if (!token) {
    console.error('Error: Usuario no autenticado. No se puede eliminar la carta.');
    return null;
  }

  try {
    const response = await API.delete(`/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error al eliminar la carta:', error);
    return null;
  }
};
