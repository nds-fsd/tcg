import { createContext, useContext } from 'react';
import { useQuery } from 'react-query';
import { fetchCurrentUser } from '../lib/utils/apiUser';
import { getUserToken } from '../lib/utils/localStorage.utils';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
  const storedToken = getUserToken();

  const { data, isLoading, isError } = useQuery('user', () => fetchCurrentUser(storedToken), {
    enabled: !!storedToken,
  });

  return <UserContext.Provider value={{ data, isLoading, isError }}>{children}</UserContext.Provider>;
};
