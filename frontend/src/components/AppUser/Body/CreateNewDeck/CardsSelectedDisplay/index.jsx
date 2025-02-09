// import React, { useState } from 'react';
// import { FaTrashAlt } from 'react-icons/fa';
// import CardItem from '../CardItem';
// import CardModal from '../CardModal';
// import styles from './cardsselecteddisplay.module.css';

// const CardsSelectedDisplay = ({ cards, onRemoveCard }) => {
//   const [selectedCard, setSelectedCard] = useState(null);

//   const handleCardClick = (card) => setSelectedCard(card);
//   const handleCloseModal = () => setSelectedCard(null);

//   const totalCards = cards.length;

//   return (
//     <div className={styles.cardsSelected}>
//       <div className={styles.cardsList}>
//         {cards.map((card, index) => (
//           <div key={`${card.name}-${index}`} className={styles.cardWrapper}>
//             <CardItem
//               card={card}
//               onAction={() => onRemoveCard(card)}
//               onClick={() => handleCardClick(card)}
//               actionLabel={<FaTrashAlt className={styles.trashIcon} />}
//             />
//           </div>
//         ))}
//       </div>
//       <div className={styles.cardCounter}>{totalCards}/40 Cartas</div>
//       {selectedCard && <CardModal card={selectedCard} onClose={handleCloseModal} />}
//     </div>
//   );
// };

// export default CardsSelectedDisplay;
