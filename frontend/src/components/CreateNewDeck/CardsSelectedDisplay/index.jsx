// import React, { useState } from 'react';
// import CardItem from '../CardItem';
// import CardModal from '../CardModal';
// import styles from './cardsselecteddisplay.module.css';

// const MAX_CARDS = 20;
// const MAX_DUPLICATES = 3;

// const CardsSelectedDisplay = ({ cards, onRemoveCard }) => {
//     const [selectedCard, setSelectedCard] = useState(null);

//     const totalCards = cards.length;
//     const isOverLimit = totalCards > MAX_CARDS;

//     const handleCardClick = (card) => setSelectedCard(card);
//     const handleCloseModal = () => setSelectedCard(null);

//     return (
//         <div className={styles.cardsSelected}>
//             <div className={styles.cardsList}>
//                 {cards.map((card, index) => (
//                     <div key={`${card.name}-${index}`} className={styles.cardWrapper}>
//                         <CardItem
//                             card={card}
//                             onAction={() => onRemoveCard(card)}
//                             onClick={() => handleCardClick(card)}
//                             actionLabel="🗑️"
//                         />
//                     </div>
//                 ))}
//             </div>
//             <div
//                 className={`${styles.cardCounter} ${
//                     isOverLimit ? styles.overLimit : ''
//                 }`}
//             >
//                 {totalCards}/{MAX_CARDS} Cartas
//             </div>
//             {isOverLimit && (
//                 <p className={styles.errorMessage}>
//                     ⚠ No puedes añadir más de {MAX_CARDS} cartas al mazo.
//                 </p>
//             )}
//             {selectedCard && (
//                 <CardModal card={selectedCard} onClose={handleCloseModal} />
//             )}
//         </div>
//     );
// };

// export default CardsSelectedDisplay;

import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import CardItem from '../CardItem';
import CardModal from '../CardModal';
import styles from './cardsselecteddisplay.module.css';

const CardsSelectedDisplay = ({ cards, onRemoveCard }) => {
    const [selectedCard, setSelectedCard] = useState(null);

    const handleCardClick = (card) => setSelectedCard(card);
    const handleCloseModal = () => setSelectedCard(null);

    const totalCards = cards.length;

    return (
        <div className={styles.cardsSelected}>
            <div className={styles.cardsList}>
                {cards.map((card, index) => (
                    <div key={`${card.name}-${index}`} className={styles.cardWrapper}>
                        <CardItem
                            card={card}
                            onAction={() => onRemoveCard(card)}
                            onClick={() => handleCardClick(card)}
                            actionLabel={<FaTrashAlt className={styles.trashIcon} />}
                        />
                    </div>
                ))}
            </div>
            <div className={styles.cardCounter}>
                {totalCards}/20 Cartas
            </div>
            {selectedCard && (
                <CardModal card={selectedCard} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default CardsSelectedDisplay;