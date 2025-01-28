import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import DeckTitle from './DeckTitle';
import CardsCollectedDisplay from './CardsCollectedDisplay';
import CardsSelectedDisplay from './CardsSelectedDisplay';
import { fetchCards } from '../../../../lib/utils/apiCard';
import { createDeck } from '../../../../lib/utils/apiDeck';
import styles from './createnewdeck.module.css';

const MAX_CARDS = 40;
const MIN_CARDS = 30;
const MAX_DUPLICATES = 3;

const CreateNewDeck = () => {
  const [deckTitle, setDeckTitle] = useState('');
  const [selectedCards, setSelectedCards] = useState([]);
  const [collectedCards, setCollectedCards] = useState([]);

  useEffect(() => {
    const loadCards = async () => {
      try {
        const data = await fetchCards();
        setCollectedCards(data);
      } catch (error) {
        toast.error('No se pudieron cargar las cartas. Inténtalo de nuevo.');
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
      toast.error(`⚠️ No puedes añadir más de ${MAX_CARDS} cartas al mazo.`);
      return;
    }

    if (cardCount >= MAX_DUPLICATES) {
      toast.error(`⚠️ No puedes agregar más de ${MAX_DUPLICATES} copias de "${card.name}".`);
      return;
    }

    setSelectedCards([...selectedCards, card]);
    // toast.success(`✅ "${card.name}" añadida al mazo.`);
  };

  const handleRemoveCard = (card) => {
    const updatedCards = selectedCards.filter((c, index) => index !== selectedCards.indexOf(card));
    setSelectedCards(updatedCards);
    toast.info(`"${card.name}" eliminada del mazo.`);
  };

  const handleSaveDeck = async () => {
    if (selectedCards.length < MIN_CARDS) {
      toast.error(`⚠️ El mazo debe tener al menos ${MIN_CARDS} cartas.`);
      return;
    }

    if (selectedCards.length > MAX_CARDS) {
      toast.error(`⚠️ El mazo no puede tener más de ${MAX_CARDS} cartas.`);
      return;
    }

    const formattedCards = selectedCards.reduce((acc, card) => {
      const existingCard = acc.find((c) => c.cardId === card.id);
      if (existingCard) {
        existingCard.amount += 1;
      } else {
        acc.push({ cardId: card.id, amount: 1 });
      }
      return acc;
    }, []);

    const payload = {
      deckTitle: deckTitle.trim(),
      cards: formattedCards,
    };

    try {
      const token = localStorage.getItem('token');
      const savedDeck = await createDeck(payload, token);

      toast.success(`✅ Mazo "${savedDeck.deckTitle}" guardado con éxito.`);
      setDeckTitle('');
      setSelectedCards([]);
    } catch (error) {
      toast.error(error.message || 'Error al guardar el mazo. Inténtalo de nuevo.');
    }
  };

  return (
    <div className={styles.createNewDeck}>
      <ToastContainer theme='dark' />
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
