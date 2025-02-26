import styles from './marketPage.module.css';
import PageTitle from '../Generic/PageTitle';

const MarketPage = () => {
  return (
    <div className={styles.marketPageContainer}>
      <PageTitle title='Mercado Libre' showAddIcon={false} showSercher={false} />
      <div className={styles.marketInfocontainer}>
        <div className={styles.marketFilterContainer}>
          <h3>Filtros</h3>
          <label>
            Nombre:
            <input type='text' placeholder='Buscar por nombre' />
          </label>
          <label>
            Precio Mínimo:
            <input type='number' min='0' placeholder='0' />
          </label>
          <label>
            Precio Máximo:
            <input type='number' min='0' placeholder='1000' />
          </label>
          <div className={styles.filterButtons}>
            <button className={styles.applyFilterButton}>Filtrar</button>
            <button className={styles.clearFilterButton}>Limpiar Filtros</button>
          </div>
        </div>
        <div className={styles.marketListCardsContainer}>
          <div className={styles.productCard}>Producto 1</div>
          <div className={styles.productCard}>Producto 2</div>
          <div className={styles.productCard}>Producto 3</div>
          <div className={styles.productCard}>Producto 4</div>
          <div className={styles.productCard}>Producto 5</div>
          <div className={styles.productCard}>Producto 6</div>
        </div>
      </div>
    </div>
  );
};

export default MarketPage;
