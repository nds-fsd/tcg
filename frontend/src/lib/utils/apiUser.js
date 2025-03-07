import axios from 'axios';
import { getUserToken } from './localStorage.utils';
import { errorToast } from '../toastify/toast';

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
});

export const fetchUsers = async () => {
  const response = await API.get('/user');
  return response.data;
};

export const fetchCurrentUser = async (token) => {
  const response = await API.get('/user/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createUser = async (newUser, userInfo) => {
  const token = getUserToken();

  if (!userInfo.admin) {
    return errorToast('El usuario no es administrador.');
  }

  const response = await API.post(
    '/admin/create',
    { newUser },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response;
};

export const updateUser = async (userUpdate) => {
  const token = getUserToken();

  const response = await API.put(
    '/user/update',
    { userUpdate },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.status;
};

export const deleteUser = async (id, data) => {
  const token = getUserToken();

  if (!data.admin) {
    return alert('El usuario no es administrador');
  }

  const response = await API.delete(`/admin/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const loginUser = async (data) => {
  const response = await API.post('/auth/login', data);
  return response.data;
};

export const registerUser = async (data) => {
  const response = await API.post('/auth/register', data);
  return response.data;
};
