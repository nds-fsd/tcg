import styles from './header.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useUser } from '../../../../context/userContext';
import { removeSession } from '../../../../lib/utils/userSession';
import { getUserToken } from '../../../../lib/utils/localStorage.utils';
import { useEffect } from 'react';

const Header = () => {
    const { userData, setToken } = useUser();
    const navigate = useNavigate();
    //console.log('Información del usuario ', userData)

    useEffect(() => {
        const token = getUserToken();
        if (token) {
            setToken(token);
        }
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
                <Link to='' className={styles.navLink}>
                    Tienda
                </Link>

                {userData?.admin && (
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
                {userData?.profilePicture ? (
                    <img
                        src={userData.profilePicture}
                        alt="Foto de perfil"
                        className={styles.userIconImage}
                        onClick={() => {
                            removeSession();
                            setToken(null);
                            navigate('/auth');
                        }}
                    />
                ) : (
                    <div
                        className={styles.userIconImage}
                        onClick={() => {
                            removeSession();
                            setToken(null);
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