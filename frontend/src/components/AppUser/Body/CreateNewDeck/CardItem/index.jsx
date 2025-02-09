// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaFireAlt, FaWater, FaMoon, FaMountain, FaSun } from 'react-icons/fa';
// import CardModal from '../CardModal';
// import styles from './carditem.module.css';

// const attributeIcons = {
//   fire: FaFireAlt,
//   water: FaWater,
//   earth: FaMountain,
//   darkness: FaMoon,
//   light: FaSun,
// };

// const rarityColors = {
//   legendary: '#ae8d0b',
//   epic: 'purple',
//   rare: '#B0B0B0',
//   common: 'black',
// };

// const categoryColors = {
//   monster: '#5c330a',
//   support: '#8892c6',
//   fusion: '#543c5a',
// };

// const rarityTranslations = {
//   Legendaria: 'legendary',
//   Épica: 'epic',
//   Rara: 'rare',
//   Común: 'common',
// };

// const categoryTranslations = {
//   Monstruo: 'monster',
//   Apoyo: 'support',
//   Fusión: 'fusion',
// };

// const normalizeValue = (value, translations) => {
//   return translations[value] || value.toLowerCase();
// };

// const CardItem = ({ card, onAction, actionLabel }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isSmallScreen, setIsSmallScreen] = useState(false);

//   const { name, image, category, rarity, attribute, type } = card;

//   //Cambiar y quitar valores por defecto

//   const normalizedRarity = normalizeValue(rarity, rarityTranslations);
//   const normalizedCategory = normalizeValue(category, categoryTranslations);

//   const AttributeIcon = attributeIcons[attribute?.toLowerCase()];
//   const rarityColor = rarityColors[normalizedRarity] || 'gray';
//   const categoryColor = categoryColors[normalizedCategory] || '#1a1a1a';

//   const handleCardClick = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       setIsSmallScreen(window.innerWidth <= 820);
//     };
//     window.addEventListener('resize', handleResize);
//     handleResize();

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return (
//     <>
//       <motion.div
//         className={`${styles.card}`}
//         style={{ borderColor: rarityColor, backgroundColor: categoryColor }}
//         whileHover={{ scale: 1.05 }}
//         onClick={handleCardClick}
//       >
//         <div className={styles.rarity} style={{ backgroundColor: rarityColors[normalizedRarity] }}>
//           {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
//         </div>

//         <div className={styles.cardImageContainer}>
//           <img
//             src={image || '../../../../../../public/assets/CardImg/cardplaceholdertcg.png'}
//             alt={name}
//             className={styles.cardImage}
//           />
//         </div>

//         <div className={styles.cardDetails}>
//           <h3 className={styles.cardName}>{name}</h3>
//           <div className={styles.cardFooter}>
//             <p className={styles.cardType}>{type}</p>
//             {AttributeIcon && <AttributeIcon className={styles.attributeIcon} />}
//           </div>
//         </div>

//         <motion.button
//           className={styles.addButton}
//           onClick={(event) => {
//             event.stopPropagation();
//             onAction(card);
//           }}
//           whileHover={{ scale: 1.1 }}
//         >
//           {isSmallScreen ? '+' : actionLabel}
//         </motion.button>
//       </motion.div>

//       <AnimatePresence>{isModalOpen && <CardModal card={card} onClose={handleCloseModal} />}</AnimatePresence>
//     </>
//   );
// };

// export default CardItem;
