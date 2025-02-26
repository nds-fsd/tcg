import axios from 'axios';
import { getUserToken } from './localStorage.utils';

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL + '/market',
});

export const getMarketInfo = async () => {
  const token = getUserToken();

  try {
    const response = await API.get('/', {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Info del market: ', response);
    return response.data;
  } catch (error) {
    throw error;
  }
};
