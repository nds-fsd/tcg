import styles from './marketPage.module.css';
import PageTitle from '../Generic/PageTitle';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCards } from '../../../../lib/utils/apiCard';

const MarketPage = () => {
  const [cardsArray, setCardsArray] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    type: '',
    attribute: '',
    rarity: '',
    expansion: '',
  });

  const categories = ['Monstruo', 'Apoyo', 'Fusión', 'Token'];
  const types = [
    'Bestia',
    'Guerrero',
    'Demonio',
    'Hada',
    'Zombie',
    'Planta',
    'Máquina',
    'Insecto',
    'Dragón',
    'Pez',
    'Roca',
    'Normal',
    'Rápida',
    'Equipo',
    'Continua',
    'Contraefecto',
  ];
  const attributes = [
    { key: 'water', value: 'Agua' },
    { key: 'fire', value: 'Fuego' },
    { key: 'darkness', value: 'Oscuridad' },
    { key: 'light', value: 'Luz' },
    { key: 'earth', value: 'Tierra' },
    { key: 'wind', value: 'Viento' },
  ];
  const rarities = ['Común', 'Rara', 'Épica', 'Legendaria'];
  const expansions = ['M', 'A', 'F', 'T'];

  useEffect(() => {
    fetchAllCards();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, cardsArray]);

  const fetchAllCards = async () => {
    try {
      const response = await fetchCards();
      setCardsArray(response);
      setFilteredCards(response);
    } catch (e) {
      console.error('Error al obtener cartas', e);
    }
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      type: '',
      attribute: '',
      rarity: '',
      expansion: '',
    });
  };

  const applyFilters = () => {
    let filtered = cardsArray.filter((card) => {
      return (
        (filters.category ? card.category === filters.category : true) &&
        (filters.type ? card.type === filters.type : true) &&
        (filters.attribute ? card.attribute === filters.attribute : true) &&
        (filters.rarity ? card.rarity === filters.rarity : true) &&
        (filters.expansion ? card.expansion === filters.expansion : true)
      );
    });
    setFilteredCards(filtered.slice(0, 80));
  };

  return (
    <div className={styles.marketPageContainer}>
      <PageTitle title='Mercado Libre' showAddIcon={false} showSercher={false} />

      <div className={styles.marketFilterContainer}>
        {[
          { label: 'Categoría', name: 'category', options: categories },
          { label: 'Tipo', name: 'type', options: types },
          { label: 'Atributo', name: 'attribute', options: attributes },
          { label: 'Rareza', name: 'rarity', options: rarities },
          { label: 'Extensión', name: 'expansion', options: expansions },
        ].map(({ label, name, options }) => (
          <div key={name} className={styles.filterSection}>
            <h5>{label}</h5>
            <select name={name} className={styles.select} value={filters[name]} onChange={handleFilterChange}>
              <option value=''>Todas</option>
              {options.map((opt) => (
                <option key={typeof opt === 'string' ? opt : opt.key} value={typeof opt === 'string' ? opt : opt.key}>
                  {typeof opt === 'string' ? opt : opt.value}
                </option>
              ))}
            </select>
          </div>
        ))}
        <button className={styles.clearButton} onClick={clearFilters}>
          Limpiar Filtros
        </button>
      </div>

      <div className={styles.marketCardsContainer}>
        <ul className={styles.marketCardsRows}>
          {filteredCards.length > 0 ? (
            filteredCards.map((card) => (
              <li key={card._id} className={styles.cardRow}>
                <Link to={`/card-detail/${card._id}`} className={styles.cardLink} state={{ card }}>
                  <div className={styles.cardField}>
                    <img className={styles.cardImg} src={card.image} alt='No img' />
                  </div>
                  <div className={styles.cardField}>{card.name}</div>
                </Link>
              </li>
            ))
          ) : (
            <li className={styles.emptyMessage}>No hay cartas.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MarketPage;
