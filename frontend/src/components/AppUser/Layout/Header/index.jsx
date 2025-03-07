import styles from './header.module.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../../../../context/userContext';
import { removeSession } from '../../../../lib/utils/userSession';
import { useEffect, useState } from 'react';

const Header = () => {
  const { data } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${styles.modal}`) && !event.target.closest(`.${styles.userIconImage}`)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsModalOpen(false);
  }, [location]);

  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    removeSession();
    navigate('/auth');
  };

  return (
    <div className={styles.header}>
      <div>
        <Link to='/'>
          <img
            src='/assets/GameImg/logopixelquest4.png'
            alt='Logo del juego'
            className={styles.gameIcon}
          />
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
        <Link to='/market' className={styles.navLink}>
          Mercado Libre
        </Link>

        {data?.admin && (
          <>
            <Link to='/user' className={styles.navLink}>
              Usuarios
            </Link>
            <Link to='/createCards' className={styles.navLink}>
              Crear Cartas
            </Link>
          </>
        )}
      </nav>

      <div className={styles.userIcon}>
        <div className={styles.userIconImage} onClick={toggleModal}>
          {data?.profilePicture ? (
            <img src={data.profilePicture} alt='Foto de perfil' />
          ) : (
            <img src='/assets/default-icon.png' alt='Icono predeterminado' />
          )}
        </div>

        {isModalOpen && (
          <div className={styles.modal}>
            <button onClick={() => navigate('/profile')}>Perfil de usuario</button>
            <button onClick={() => navigate('/purchase-history')}>Historial de Compras</button>
            <button onClick={() => navigate('/purchase-history')}>Historial de Mercado Libre</button>
            <button onClick={() => navigate('/stats')}>Trofeos</button>
            <button onClick={() => navigate('/stats')}>Estadísticas</button>
            <button onClick={() => navigate('/friends')}>Amigos</button>
            <button onClick={handleLogout}>Cerrar Sessión</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
