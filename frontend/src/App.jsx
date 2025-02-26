import AuthPage from './components/AuthPage';
import NotFound from './components/AppUser/Layout/NotFound';
import Layout from './components/AppUser/Layout';
import HomePage from './components/AppUser/Body/HomePage';
import Deck from './components/AppUser/Body/DeckPage';
import User from './components/AppUser/Body/UserPage';
import UserCollection from './components/AppUser/Body/UserCollectionPage';
import CreateNewDeck from './components/AppUser/Body/CreateNewDeck';
import Store from './components/AppUser/Body/Store';
import Market from './components/AppUser/Body/Market';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { getUserToken } from './lib/utils/localStorage.utils';
import { UserContextProvider } from './context/userContext';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      const currentToken = getUserToken();
      if (currentToken === null) {
        navigate('/auth');
      }
    };
    checkToken();

    window.addEventListener('storage', checkToken);

    return () => {
      window.removeEventListener('storage', checkToken);
    };
  }, [navigate]);
  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path='auth' element={<AuthPage />} />
          <Route path='*' element={<NotFound />} />
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<HomePage />} />
            <Route path='deck' element={<Deck />} />
            <Route path='controldeck' element={<CreateNewDeck />} />
            <Route path='store' element={<Store />} />
            <Route path='market' element={<Market />} />
            <Route path='user' element={<User />} />
            <Route path='collection' element={<UserCollection />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
};

export default App;
