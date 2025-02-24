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
      return [];
    }
    return data;
  } catch (error) {
    return [];
  }
};

export const createCard = async (card) => {
  const token = getUserToken();
  if (!token) {
    return null;
  }

  try {
    const response = await API.post('/', card, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const updateCard = async (id, card) => {
  const token = getUserToken();
  if (!token) {
    return null;
  }

  try {
    const response = await API.put(`/${id}`, card, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const deleteCard = async (id) => {
  const token = getUserToken();
  if (!token) {
    return null;
  }

  try {
    const response = await API.delete(`/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return null;
  }
};
