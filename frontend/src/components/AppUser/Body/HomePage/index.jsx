import { Link } from "react-router-dom";
import styles from "./homePage.module.css";

const HomePage = () => {
    return (
        <div className={styles.homePagecontainer}>
            <h1 className={styles.homePageTitle}>Te damos la bienvenida a PixelQuest TCG</h1>

            <p className={styles.homePageDescription}>
                PixelQuest TCG es un emocionante juego de cartas de estilo medieval fantástico,
                donde podrás hacer amistades, enfrentarte en batallas épicas y coleccionar poderosas cartas.
                ¿Todo a punto para la aventura?
            </p>

            <div className={styles.homePageSections}>

                <div className={styles.homePageSection}>
                    <h2 className={styles.homePageSectionTitle}>¡Desafía a tus rivales!</h2>
                    <p>
                        Ingresa a la arena y demuestra tu habilidad en batallas estratégicas contra rivales dignos de tu habilidad.
                    </p>
                    <Link to="/battles" className={`${styles.homePageButton} ${styles.battleButton}`}>
                        Ir a batallas
                    </Link>
                </div>

                <div className={styles.homePageSection}>
                    <h2 className={styles.homePageSectionTitle}>Conoce al equipo</h2>
                    <p>
                        Descubre quiénes están detrás de este mundo de fantasía y cómo trabajamos para hacer crecer PixelQuest TCG.
                    </p>
                    <Link to="/about" className={`${styles.homePageButton} ${styles.aboutButton}`}>
                        Sobre nosotros
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;