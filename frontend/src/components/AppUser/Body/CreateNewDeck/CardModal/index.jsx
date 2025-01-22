import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { FaFireAlt, FaWater, FaLeaf, FaMoon, FaMountain, FaSun } from 'react-icons/fa';
import styles from './cardmodal.module.css';

const attributeIcons = {
  fire: FaFireAlt,
  water: FaWater,
  earth: FaMountain,
  darkness: FaMoon,
  plant: FaLeaf,
  ligth: FaSun,
};

const rarityClasses = {
  legendary: styles.rarityLegendary,
  epic: styles.rarityEpic,
  rare: styles.rarityRare,
  common: styles.rarityCommon,
};

const CardModal = ({ card, onClose }) => {
  const { name, image, type, rarity, attribute, description, category, expansion, atk, def, effect } = card;

  const normalizedAttribute = attribute?.toLowerCase() || 'fire';
  const normalizedRarity = rarity?.toLowerCase() || 'common';

  const AttributeIcon = attributeIcons[normalizedAttribute] || FaFireAlt;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [-10, 10]);
  const rotateY = useTransform(x, [-50, 50], [10, -10]);

  return (
    <motion.div
      className={styles.modalBackground}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={`${styles.modalContent} ${category === 'Support' ? styles.support : styles.monster}`}
        style={{ x, y, rotateX, rotateY }}
        onMouseMove={(event) => {
          const { clientX, clientY } = event;
          const rect = event.currentTarget.getBoundingClientRect();

          x.set(clientX - rect.left - rect.width / 2);
          y.set(clientY - rect.top - rect.height / 2);
        }}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`${styles.rarityBadge} ${rarityClasses[normalizedRarity] || styles.rarityCommon}`}>
          {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
        </div>

        <div className={styles.cardImageContainer}>
          <img src={image} alt={name} className={styles.modalImage} />
        </div>

        <div className={styles.cardDetails}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardName}>{name}</h2>
            <AttributeIcon className={styles.attributeIcon} />
          </div>
          <p className={styles.cardType}>{type}</p>
          <p className={styles.cardDescription}>{description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CardModal;
