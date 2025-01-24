import React, { useState, useEffect } from 'react';
import DeckTitle from './DeckTitle';
import CardsCollectedDisplay from './CardsCollectedDisplay';
import CardsSelectedDisplay from './CardsSelectedDisplay';
import { fetchCards } from '../../../../lib/utils/apiCard';
import styles from './createnewdeck.module.css';

const MAX_CARDS = 40;
const MIN_CARDS = 30;
const MAX_DUPLICATES = 3;

const CreateNewDeck = () => {
  const [deckTitle, setDeckTitle] = useState('');
  const [selectedCards, setSelectedCards] = useState([]);
  const [collectedCards, setCollectedCards] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  useEffect(() => {
    const loadCards = async () => {
      try {
        const data = await fetchCards();
        setCollectedCards(data);
      } catch (error) {
        console.error('Error al cargar las cartas:', error);
        setErrorMessage('No se pudieron cargar las cartas. Inténtalo de nuevo.');
      }
    };

    loadCards();
  }, []);

  const handleTitleChange = (newTitle) => {
    setDeckTitle(newTitle);
  };

  const handleAddCard = (card) => {
    const cardCount = selectedCards.filter((c) => c.name === card.name).length;

    if (selectedCards.length >= MAX_CARDS) {
      setErrorMessage(`⚠️ No puedes añadir más de ${MAX_CARDS} cartas al mazo.`);
      return;
    }

    if (cardCount >= MAX_DUPLICATES) {
      setErrorMessage(`⚠️ No puedes agregar más de ${MAX_DUPLICATES} copias de "${card.name}".`);
      return;
    }

    setSelectedCards([...selectedCards, card]);
  };

  const handleRemoveCard = (card) => {
    const updatedCards = selectedCards.filter((c, index) => index !== selectedCards.indexOf(card));
    setSelectedCards(updatedCards);
  };

  const handleSaveDeck = () => {
    if (selectedCards.length < MIN_CARDS) {
      setErrorMessage(`⚠️ El mazo debe tener al menos ${MIN_CARDS} cartas.`);
      return;
    }

    if (selectedCards.length > MAX_CARDS) {
      setErrorMessage(`⚠️ El mazo no puede tener más de ${MAX_CARDS} cartas.`);
      return;
    }

    alert('Mazo guardado');
  };

  return (
    <div className={styles.createNewDeck}>
      <DeckTitle onTitleChange={handleTitleChange} />
      <div className={styles.deckContent}>
        <div className={styles.cardsCollectedWrapper}>
          <CardsCollectedDisplay
            cards={Array.isArray(collectedCards) ? collectedCards : []}
            onAddCard={handleAddCard}
          />
        </div>
        <div className={styles.cardsSelectedWrapper}>
          <CardsSelectedDisplay cards={selectedCards} onRemoveCard={handleRemoveCard} />
        </div>
      </div>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      <button
        disabled={deckTitle.trim() === '' || selectedCards.length < MIN_CARDS || selectedCards.length > MAX_CARDS}
        onClick={handleSaveDeck}
      >
        Guardar Mazo
      </button>
    </div>
  );
};

export default CreateNewDeck;
