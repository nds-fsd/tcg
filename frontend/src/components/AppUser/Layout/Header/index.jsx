import styles from './header.module.css';
import { FaGamepad, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useUser } from '../../../../context/userContext';
import { removeSession } from '../../../../lib/utils/localStorage.utils';

const Header = () => {
  const { userData } = useUser();
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <div>
        <Link to='/'>
          <img src="./public/assets/GameImg/logopixelquest4.png" alt="Logo del juego" className={styles.gameIcon} />
        </Link>
      </div>

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

        {userData?.role && (
          <>
            <Link to='/user' className={styles.navLink}>
              Usuarios
            </Link>
            <Link to='/' className={styles.navLink}>
              Crear Cartas
            </Link>
          </>
        )}
      </nav>

      <div className={styles.userIcon}>
        <FaUserCircle className={styles.userIconImage} />
      </div>
      <button
        id='log-out-button'
        onClick={() => {
          removeSession();
          navigate('/auth');
        }}
      >
        Salir
      </button>
    </div>
  );
};

export default Header;
