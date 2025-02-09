import axios from 'axios';
import { getUserToken } from './localStorage.utils';
import { useUser } from '../../context/userContext';

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
});


// export const fetchUsers = async () => {
//     const response = await API.get('/user');
//     return response.data;
// };

export const fetchCurrentUser = async (token) => {
    
    const response = await API.get('/user/me', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return response.data;
};

export const createUser = async (newUser, userData) => {
    const token = getUserToken();

    if (!userData.admin) {
        return alert('El usuario no es administrador');
    }

    const response = await API.post('/user/admin/create', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: newUser

    });
    return response;
};

// export const updateUser = async (id, user) => {
//     const response = await API.put(`/user/${id}`, user);
//     return response.data;
// };

// export const deleteUser = async (id) => {
//     const response = await API.delete(`/user/${id}`);
//     return response.data;
// };

export const loginUser = async (data) => {
    const response = await API.post('/auth/login', data);
    return response.data;
};

export const registerUser = async (data) => {
    const response = await API.post('/auth/register', data);
    return response.data;
};
