import Layout from './components/AppUser/Layout';
import HomePage from './components/AppUser/Body/HomePage';
import Deck from './components/AppUser/Body/DeckPage';
import UserCollection from './components/AppUser/Body/UserCollectionPage';
import User from './components/AppUser/Body/UserPage';
import NotFound from './components/AppUser/Layout/NotFound';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateNewDeck from './components/AppUser/Body/CreateNewDeck';
import AuthPage from './components/AuthPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='deck' element={<Deck />} />
          <Route path='controldeck' element={<CreateNewDeck />} />
          <Route path='collection' element={<UserCollection />} />
          <Route path='user' element={<User />} />
          <Route path='*' element={<NotFound />} />
        </Route>
        <Route path='auth' element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
