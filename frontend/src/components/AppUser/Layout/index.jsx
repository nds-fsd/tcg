import '@fontsource/metamorphous';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => (
  <>
    <Header />
    <ToastContainer />
    <main>
      <Outlet />
    </main>
    {/* <Footer /> */}
  </>
);

export default Layout;
