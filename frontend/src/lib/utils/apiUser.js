import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
});

export const fetchUsers = () => API.get('/user');
export const createUser = (user) => API.post('/user', user);
export const updateUser = (id, user) => API.put(`/user/${id}`, user);
export const deleteUser = (id) => API.delete(`/user/${id}`);

export const loginUser = (data) => API.post('/auth/login', data).then((res) => res.data);
export const registerUser = (data) => API.post('/auth/register', data).then((res) => res.data);
