import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3001' });

export const fetchUsers = () => API.get('/user');
export const createUser = (user) => API.post('/user', user);
export const updateUser = (id, user) => API.put(`/user/${id}`, user);
export const deleteUser = (id) => API.delete(`/user/${id}`);