import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import styles from './filtermenu.module.css';

const FilterMenu = ({ filters, onFilterChange, onClearFilters }) => {
  const categories = ['Monster', 'Support'];
  const types = ['Beast', 'Warrior', 'Demon', 'Fairy', 'Zombie', 'Plant'];
  const attributes = ['Water', 'Fire', 'Darkness', 'Light', 'Earth', 'Wind'];
  const rarities = ['Common', 'Rare', 'Epic', 'Legendary'];

  return (
    <div className={styles.filterMenu}>
      <h4>Filtros</h4>
      <div className={styles.filterSection}>
        <h5>Categoría</h5>
        {categories.map((category) => (
          <label key={category}>
            <input
              type='checkbox'
              checked={filters.category.includes(category)}
              onChange={() => onFilterChange('category', category)}
            />
            {category}
          </label>
        ))}
      </div>
      <div className={styles.filterSection}>
        <h5>Tipo</h5>
        {types.map((type) => (
          <label key={type}>
            <input
              type='checkbox'
              checked={filters.type.includes(type)}
              onChange={() => onFilterChange('type', type)}
            />
            {type}
          </label>
        ))}
      </div>
      <div className={styles.filterSection}>
        <h5>Atributo</h5>
        {attributes.map((attribute) => (
          <label key={attribute}>
            <input
              type='checkbox'
              checked={filters.type.includes(attribute)}
              onChange={() => onFilterChange('attribute', attribute)}
            />
            {attribute}
          </label>
        ))}
      </div>
      <div className={styles.filterSection}>
        <h5>Rareza</h5>
        {rarities.map((rarity) => (
          <label key={rarity}>
            <input
              type='checkbox'
              checked={filters.rarity.includes(rarity)}
              onChange={() => onFilterChange('rarity', rarity)}
            />
            {rarity}
          </label>
        ))}
      </div>
      <button className={styles.clearButton} onClick={onClearFilters}>
        <FaTrashAlt className={styles.icon} /> Limpiar Filtros
      </button>
    </div>
  );
};

export default FilterMenu;
