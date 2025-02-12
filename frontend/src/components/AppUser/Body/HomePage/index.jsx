import { Link } from 'react-router-dom';
import styles from './homePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.homePagecontainer}>
      <h1 className={styles.homePageTitle}>Bienvenido a Pixel-Quest-TCG</h1>

      <p className={styles.homePageDescription}>
        Pixel-Quest-TCG es un emocionante juego de cartas de estilo medieval fantástico, donde podrás hacer amigos,
        enfrentarte en batallas épicas y coleccionar poderosas cartas. ¿Estás listo para la aventura?
      </p>

      <div className={styles.homePageSections}>
        <div className={styles.homePageSection}>
          <h2 className={styles.homePageSectionTitle}>¡Desafía a tus rivales!</h2>
          <p>Ingresa a la arena y demuestra tu habilidad en batallas estratégicas contra otros jugadores.</p>
          <Link to='/battles' className={`${styles.homePageButton} ${styles.battleButton}`}>
            Ir a Batallas
          </Link>
        </div>

        <div className={styles.homePageSection}>
          <h2 className={styles.homePageSectionTitle}>Conoce al equipo</h2>
          <p>
            Descubre quiénes están detrás de este mundo de fantasía y cómo trabajamos para hacer crecer Pixel-Quest-TCG.
          </p>
          <Link to='/about' className={`${styles.homePageButton} ${styles.aboutButton}`}>
            Sobre Nosotros
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
