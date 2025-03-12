import styles from '../headerNav.module.css';
import { Link } from 'react-router-dom';
import { useUser } from '../../../../../../context/userContext';

const HeaderNavAdmin = () => {
  const { data } = useUser();

  return (
    <>
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
    </>
  );
};

export default HeaderNavAdmin;
