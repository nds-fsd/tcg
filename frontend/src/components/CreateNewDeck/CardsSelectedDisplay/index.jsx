import React, { useState } from 'react';
import CardItem from '../CardItem';
import CardModal from '../CardModal';
import styles from './cardsselecteddisplay.module.css';

const MAX_CARDS = 20;
const MAX_DUPLICATES = 3;

const CardsSelectedDisplay = ({ cards, onRemoveCard }) => {
    const [selectedCard, setSelectedCard] = useState(null);

    const cardCounts = cards.reduce((acc, card) => {
        acc[card.name] = (acc[card.name] || 0) + 1;
        return acc;
    }, {});

    const totalCards = cards.length;
    const isOverLimit = totalCards > MAX_CARDS;

    const handleCardClick = (card) => setSelectedCard(card);
    const handleCloseModal = () => setSelectedCard(null);

    return (
        <div className={styles.cardsSelected}>
            <div className={styles.cardsList}>
            {Object.keys(cardCounts).map((cardName)  => {
                    const card = cards.find((c) => c.name === cardName);
                    const count = cardCounts[cardName];

                    return (
                        <div key={cardName} className={styles.cardWrapper}>
                            <CardItem
                                card={card}
                                onAction={() => onRemoveCard(card)}
                                onClick={() => handleCardClick(card)}
                                actionLabel="🗑️"
                            />
                            <span className={styles.cardCount}>
                                x{count} {count > MAX_DUPLICATES && <span className={styles.overLimit}>⚠</span>}
                            </span>
                        </div>
                    );
                })}
            </div>
            <div
                className={`${styles.cardCounter} ${
                    isOverLimit ? styles.overLimit : ''
                }`}
            >
                {totalCards}/{MAX_CARDS} Cartas
            </div>
            {isOverLimit && (
                <p className={styles.errorMessage}>
                    ⚠ No puedes añadir más de {MAX_CARDS} cartas al mazo.
                </p>
            )}
            {selectedCard && (
                <CardModal card={selectedCard} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default CardsSelectedDisplay;