import styles from './headerNav.module.css';
import HeaderNavAdmin from './HeaderNavAdmin';
import { Link } from 'react-router-dom';

const HeaderNav = () => {
  return (
    <nav className={styles.nav}>
      <Link to='/deck' className={styles.navLink}>
        Mazos
      </Link>
      <Link to='/collection' className={styles.navLink}>
        Colección
      </Link>
      <Link to='/store' className={styles.navLink}>
        Tienda
      </Link>
      <Link to='/market' className={styles.navLink}>
        Mercado Libre
      </Link>

      <HeaderNavAdmin />
    </nav>
  );
};

export default HeaderNav;
