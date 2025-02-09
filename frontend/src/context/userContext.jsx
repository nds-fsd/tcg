import { createContext, useContext, useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchCurrentUser } from '../lib/utils/apiUser';
import { getUserToken } from '../lib/utils/localStorage.utils';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {

    useEffect(() => {
        const storedToken = getUserToken();

        if (storedToken) {

            const { data, isLoading, isError } = useQuery(
                'user',
                () => fetchCurrentUser(storedToken),
            );
        }
    }, []);

    return (
        <UserContext.Provider value={{ user: data }}>
            {children}
        </UserContext.Provider>
    );
};