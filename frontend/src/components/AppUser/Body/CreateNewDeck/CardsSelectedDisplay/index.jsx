import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import CardItem from '../CardItem';
import CardModal from '../CardModal';
import styles from './cardsselecteddisplay.module.css';

const CardsSelectedDisplay = ({ normalCards, fusionCards, onRemoveCard }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (card) => setSelectedCard(card);
  const handleCloseModal = () => setSelectedCard(null);

  const totalCards = normalCards.length + fusionCards.length;

  return (
    <div className={styles.cardsSelected}>
      <div className={styles.normalCardsContainer}>
        <h3 className={styles.sectionTitle}>Monstruos y Apoyo ({normalCards.length}/40)</h3>
        <div className={styles.cardsList}>
          {normalCards.map((card, index) => (
            <div key={`${card.name}-${index}`} className={styles.cardWrapper}>
              <CardItem
                card={card}
                onAction={() => onRemoveCard(card)}
                actionLabel={<FaTrashAlt className={styles.trashIcon} />}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.fusionCardsContainer}>
        <h3 className={styles.sectionTitle}>Fusión ({fusionCards.length}/10)</h3>
        <div className={styles.cardsList}>
          {fusionCards.map((card, index) => (
            <div key={`${card.name}-${index}`} className={styles.cardWrapper}>
              <CardItem
                card={card}
                onAction={() => onRemoveCard(card)}
                actionLabel={<FaTrashAlt className={styles.trashIcon} />}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Contador total de cartas */}
      <div className={styles.cardCounter}>{totalCards}/50 Cartas Totales</div>
      {selectedCard && <CardModal card={selectedCard} onClose={handleCloseModal} />}
    </div>
  );
};

export default CardsSelectedDisplay;
