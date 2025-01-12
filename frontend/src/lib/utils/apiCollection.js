import axios from 'axios';

const API = axios.create({
  baseURL: process.env.BACKEND_API_URL,
  timeout: 1000,
});

export const fetchUsers = () => API.get('/user');
export const createUser = (user) => API.post('/user', user);
export const updateUser = (id, user) => API.put(`/user/${id}`, user);
export const deleteUser = (id) => API.delete(`/user/${id}`);
