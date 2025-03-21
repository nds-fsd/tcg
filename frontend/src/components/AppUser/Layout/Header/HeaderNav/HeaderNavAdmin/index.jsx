import styles from '../headerNav.module.css';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../../../../../../context/userContext';

const HeaderNavAdmin = () => {
  const { data } = useUser();
  const location = useLocation();

  return (
    <>
      {data?.admin && (
        <>
          <Link to='/user' className={`${styles.navLink} ${location.pathname === '/user' ? styles.navLinkactive : ''}`}>
            Usuarios
          </Link>
          {/* <Link
            to='/createCards'
            className={`${styles.navLink} ${location.pathname === '/createCards' ? styles.navLinkactive : ''}`}
          >
            Crear Cartas
          </Link> */}
        </>
      )}
    </>
  );
};

export default HeaderNavAdmin;
