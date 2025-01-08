import styles from './header.module.css';
import { FaGamepad, FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Header = () => {

    return (
        <div className={styles.header}>
            {/* Icono del juego a la izquierda */}
            <div className={styles.logo}>
                <Link to="/"><FaGamepad className={styles.gameIcon} /></Link>
            </div>

            {/* Navegación en el centro */}
            <nav className={styles.nav}>
                <Link to="/deck" className={styles.navLink}>Deck Page</Link>
                <Link to="/collection" className={styles.navLink}>Collection</Link>
                <Link to="/user" className={styles.navLink}>Usuarios</Link>
            </nav>

            {/* Icono de usuario a la derecha */}
            <div className={styles.userIcon}>
                <FaUserCircle className={styles.userIconImage} />
            </div>
        </div>
    );
};

export default Header;