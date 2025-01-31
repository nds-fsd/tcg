import axios from 'axios';
import { getUserToken } from './localStorage.utils';

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL + '/userCollection',
});

export const fetchUserCollection = async () => {
    const token = getUserToken();
    try {
        const response = await API.get('/', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data[0].cards || [];
    } catch (e) {
        console.error('Error fetching user collection:', e);
        return [];
    }
};

export const createCardUser = (idUser, idCard) => {
    const token = getUserToken();
    return API.post('/',
        { userId: idUser, cardId: idCard },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const deleteCardUser = (idUser, idCard) => {
    const token = getUserToken();
    return API.delete(`/${idUser}/cards/${idCard}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
};