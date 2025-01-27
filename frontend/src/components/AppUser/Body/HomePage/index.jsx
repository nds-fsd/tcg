import styles from './homePage.module.css'; // Importamos como módulo CSS

const HomePage = () => {
  return (
    <div className={styles.homeContainer}>
      <header className={styles.homeHeader}>
        <h1 className={styles.homeTitle}>Bienvenido a Pixel-Quest-TCG</h1>
        <p className={styles.homeDescription}>
          Explora el mundo de Pixel-Quest-TCG, un juego de cartas coleccionables inspirado en la era medieval fantástica
          y diseñado en un encantador estilo pixel art. ¡Construye tu mazo, lucha contra otros jugadores y conquista el
          reino!
        </p>
      </header>
      <div className={styles.homeContent}>
        <div className={styles.homeCta}>
          <button className={styles.homeButton}>¡Jugar Ahora!</button>
          <button className={`${styles.homeButton} ${styles.secondary}`}>Aprende Más</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
