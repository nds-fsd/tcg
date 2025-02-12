import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import styles from './filtermenu.module.css';

const FilterMenu = ({ filters, onFilterChange, onClearFilters }) => {
    const categories = ['Monstruo', 'Apoyo', 'Fusión'];
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

    return (
        <div className={styles.filterMenu}>
            <div className={styles.filterSection}>
                <h5>Categoría</h5>
                <select
                    value={filters.category}
                    onChange={(e) => onFilterChange('category', e.target.value)}
                    className={styles.select}
                >
                    <option value=''>Todas</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.filterSection}>
                <h5>Tipo</h5>
                <select value={filters.type} onChange={(e) => onFilterChange('type', e.target.value)} className={styles.select}>
                    <option value=''>Todos</option>
                    {types.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.filterSection}>
                <h5>Atributo</h5>
                <select
                    value={filters.attribute}
                    onChange={(e) => onFilterChange('attribute', e.target.value)}
                    className={styles.select}
                >
                    <option value=''>Todos</option>
                    {attributes.map(({ key, value }) => (
                        <option key={key} value={key}>
                            {value}
                        </option>
                    ))}
                </select>
            </div>
            <div className={styles.filterSection}>
                <h5>Rareza</h5>
                <select
                    value={filters.rarity}
                    onChange={(e) => onFilterChange('rarity', e.target.value)}
                    className={styles.select}
                >
                    <option value=''>Todas</option>
                    {rarities.map((rarity) => (
                        <option key={rarity} value={rarity}>
                            {rarity}
                        </option>
                    ))}
                </select>
            </div>
            <div className={styles.filterSection}>
                <button className={styles.clearButton} onClick={onClearFilters}>
                    <FaTrashAlt className={styles.icon} /> Limpiar Filtros
                </button>
            </div>
        </div>
    );
};

export default FilterMenu;