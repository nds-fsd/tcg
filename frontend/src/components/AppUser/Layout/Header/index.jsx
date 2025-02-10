import styles from './header.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useUser } from '../../../../context/userContext';
import { removeSession } from '../../../../lib/utils/userSession';
import { useEffect } from 'react';

const Header = () => {
    const { data } = useUser();
    console.log('Datos del usuario actual ', data);
    const navigate = useNavigate();

    useEffect(() => {
    }, []);

    return (
        <div className={styles.header}>
            <div>
                <Link to='/'>
                    <img src="/assets/GameImg/logopixelquest4.png" alt="Logo del juego" className={styles.gameIcon} />
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
                {data?.profilePicture ? (
                    <img
                        src={data.profilePicture}
                        alt="Foto de perfil"
                        className={styles.userIconImage}
                        onClick={() => {
                            removeSession();
                            navigate('/auth');
                        }}
                    />
                ) : (
                    <div
                        className={styles.userIconImage}
                        onClick={() => {
                            removeSession();
                            navigate('/auth');
                        }}
                    >
                        <img src="/assets/default-icon.png" alt="Icono predeterminado" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;