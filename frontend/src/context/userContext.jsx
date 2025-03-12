import { createContext, useContext, useState, useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { fetchCurrentUser } from '../lib/utils/apiUser';
import { getUserToken } from '../lib/utils/localStorage.utils';
import { removeSession } from '../lib/utils/userSession';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const storedToken = getUserToken();
  const [isLoggedIn, setIsLoggedIn] = useState(!!storedToken);

  const { data, isLoading } = useQuery('user', () => fetchCurrentUser(storedToken), {
    enabled: !!storedToken,
    onError: () => {
      removeSession();
      queryClient.removeQueries('user');
      setIsLoggedIn(false);
    },
  });

  const updateUser = () => {
    queryClient.invalidateQueries('user');
  };

  useEffect(() => {
    if (data) setIsLoggedIn(true);
  }, [data]);

  return <UserContext.Provider value={{ data, isLoggedIn, updateUser, isLoading }}>{children}</UserContext.Provider>;
};
