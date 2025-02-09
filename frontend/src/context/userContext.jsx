import { createContext, useContext, useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchCurrentUser } from '../lib/utils/apiUser';
import { getUserToken } from '../lib/utils/localStorage.utils';
import axios from 'axios';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [token, setToken] = useState(null);
    const queryClient = useQueryClient();

    useEffect(() => {
        const storedToken = getUserToken();
        
        if (storedToken) {
            setToken(storedToken);

            const { data, isLoading, isError } = useQuery(
                'user',
                () => fetchCurrentUser(token),
                {
                    onSuccess: (data) => {
                        setUserData(data);
                    },
                    onError: (e) => {
                        setUserData(null);
                    },
                }
            );
        }

    }, []);



    const updateUserMutation = useMutation(
        async (updatedData) => {
            const response = await axios.put(`/user/${updatedData.id}`, updatedData);
            return response.data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('user');
            },
            onError: (error) => {
                console.error('Error al actualizar el usuario:', error);
            },
        }
    );

    return (
        <UserContext.Provider value={{ userData, setToken, updateUserMutation, isLoading, isError }}>
            {children}
        </UserContext.Provider>
    );
};