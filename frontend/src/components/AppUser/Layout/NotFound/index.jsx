import styles from './notFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Error 404</h1>
      <p className={styles.text}>La página que estás buscando no existe.</p>
      <a href='/' className={styles.return}>
        Volver a la página principal
      </a>
    </div>
  );
};

export default NotFound;
