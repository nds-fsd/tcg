import Layout from './components/AppUser/Layout';
import HomePage from './components/AppUser/Body/HomePage';
import Deck from './components/AppUser/Body/DeckPage';
import UserCollection from './components/AppUser/Body/UserCollectionPage';
import User from './components/AppUser/Body/UserPage';
import NotFound from './components/AppUser/Layout/NotFound';
import CreateNewDeck from './components/AppUser/Body/CreateNewDeck';
import Store from './components/AppUser/Body/Store';
import AuthPage from './components/AuthPage';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { getUserToken } from './lib/utils/localStorage.utils';
import { UserContextProvider } from './context/userContext';

const queryClient = new QueryClient();

const ProtectedRoute = ({ token, children }) => {
  if (token == undefined) {
    return <Navigate to='/auth' replace />;
  }
  return children;
};

const App = () => {
  const [forceUpdate, setForceUpdate] = useState(false);
  const token = getUserToken();

  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path='/'
              element={
                <ProtectedRoute token={token}>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<HomePage />} />
              <Route path='deck' element={<Deck />} />
              <Route path='controldeck' element={<CreateNewDeck />} />
              <Route path='collection' element={<UserCollection />} />
              <Route path='store' element={<Store />} />
              <Route path='user' element={<User />} />
            </Route>
            <Route path='*' element={<NotFound />} />
            <Route path='auth' element={<AuthPage forceUpdate={forceUpdate} setForceUpdate={setForceUpdate} />} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </QueryClientProvider>
  );
};

export default App;
