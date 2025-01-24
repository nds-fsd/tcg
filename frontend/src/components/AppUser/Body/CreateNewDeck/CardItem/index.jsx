import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFireAlt, FaWater, FaLeaf, FaMoon, FaMountain, FaSun } from 'react-icons/fa';
import CardModal from '../CardModal';
import styles from './carditem.module.css';

const attributeIcons = {
  fire: FaFireAlt,
  water: FaWater,
  earth: FaMountain,
  darkness: FaMoon,
  plant: FaLeaf,
  light: FaSun,
};

const rarityColors = {
  legendary: 'gold',
  epic: 'purple',
  rare: 'green',
  common: 'gray',
};

const CardItem = ({ card, onAction, actionLabel }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { name, image, category, rarity, attribute, type, expansion, atk, def, effect, level } = card;

  //Cambiar y quitar valores por defecto

  const normalizedAttribute = attribute?.toLowerCase() || 'fire';
  const normalizedRarity = rarity?.toLowerCase() || 'common';

  const AttributeIcon = attributeIcons[normalizedAttribute] || FaFireAlt;

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const CARD_CATEGORIES = {
    monster: 'Monster',
    support: 'Support',
    fusion: 'Fusion',
  };

  return (
    <>
      <motion.div
        className={`${styles.card} ${category === CARD_CATEGORIES.support ? styles.support : styles.monster}`}
        whileHover={{ scale: 1.05 }}
        onClick={handleCardClick}
      >
        <div className={styles.rarity} style={{ backgroundColor: rarityColors[normalizedRarity] }}>
          {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
        </div>

        <div className={styles.cardImageContainer}>
          <img src={image || '/images/placeholder.png'} alt={name} className={styles.cardImage} />
        </div>

        <div className={styles.cardDetails}>
          <h3 className={styles.cardName}>{name}</h3>
          <div className={styles.cardFooter}>
            <p className={styles.cardType}>{type}</p>
            <AttributeIcon className={styles.attributeIcon} />
          </div>
        </div>

        <motion.button
          className={styles.addButton}
          onClick={(event) => {
            event.stopPropagation();
            onAction(card);
          }}
          whileHover={{ scale: 1.1 }}
        >
          {actionLabel || '+ Añadir'}
        </motion.button>
      </motion.div>

      <AnimatePresence>{isModalOpen && <CardModal card={card} onClose={handleCloseModal} />}</AnimatePresence>
    </>
  );
};

export default CardItem;
