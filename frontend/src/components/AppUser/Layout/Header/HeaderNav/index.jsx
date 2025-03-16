import styles from './headerNav.module.css';
import HeaderNavAdmin from './HeaderNavAdmin';
import { Link, useLocation } from 'react-router-dom';

const HeaderNav = () => {
  const location = useLocation();

  return (
    <nav className={styles.nav}>
      <Link to='/deck' className={`${styles.navLink} ${location.pathname === '/deck' ? styles.navLinkactive : ''}`}>
        Mazos
      </Link>
      <Link
        to='/collection'
        className={`${styles.navLink} ${location.pathname === '/collection' ? styles.navLinkactive : ''}`}
      >
        Colección
      </Link>
      <Link to='/store' className={`${styles.navLink} ${location.pathname === '/store' ? styles.navLinkactive : ''}`}>
        Tienda
      </Link>
      <Link to='/market' className={`${styles.navLink} ${location.pathname === '/market' ? styles.navLinkactive : ''}`}>
        Mercado Libre
      </Link>

      <HeaderNavAdmin />
    </nav>
  );
};

export default HeaderNav;
