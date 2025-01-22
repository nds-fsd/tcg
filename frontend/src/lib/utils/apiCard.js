import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL + '/card',
});

export const fetchCards = () => API.get('/');
export const createCard = (card) => API.post('/', card);
export const updateCard = (id, card) => API.put(`/${id}`, card);
export const deleteCard = (id) => API.delete(`/${id}`);
