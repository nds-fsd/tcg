import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import DeckTitle from './DeckTitle';
import { fetchUserCollection } from '../../../../lib/utils/apiUserCollection';
import CardsCollectedDisplay from './CardsCollectedDisplay';
import CardsSelectedDisplay from './CardsSelectedDisplay';
import { createDeck } from '../../../../lib/utils/apiDeck';
import styles from './createnewdeck.module.css';

const MAX_CARDS = 40;
const MAX_FUSION_CARDS = 10;
const MAX_DUPLICATES = 3;

const CreateNewDeck = () => {
  const [deckTitle, setDeckTitle] = useState('');
  const [selectedCards, setSelectedCards] = useState([]);
  const [selectedFusionCards, setSelectedFusionCards] = useState([]);
  const [userCards, setUserCards] = useState([]);

  useEffect(() => {
    const getUserCards = async () => {
      try {
        const response = await fetchUserCollection();
        setUserCards(response.map(({ cardId, amount }) => ({ ...cardId, id: cardId._id, amount: amount })));
      } catch (e) {
        setError('Error al cargar las cartas');
      }
    };

    getUserCards();
  }, []);

  const handleTitleChange = (newTitle) => {
    setDeckTitle(newTitle);
  };

  const handleAddCard = (card) => {
    const userCard = userCards.find((c) => c.id === card.id);
    const userCardQuantity = userCard ? userCard.amount : 0;

    const isFusionCard = card.category.toLowerCase() === 'fusion';

    const cardCount = isFusionCard
      ? selectedFusionCards.filter((c) => c.id === card.id).length
      : selectedCards.filter((c) => c.id === card.id).length;

    if (isFusionCard) {
      if (selectedFusionCards.length >= MAX_FUSION_CARDS) {
        toast.error(`⚠️ No puedes añadir más de ${MAX_FUSION_CARDS} cartas de fusión.`);
        return;
      }
    } else {
      if (selectedCards.length >= MAX_CARDS) {
        toast.error(`⚠️ No puedes añadir más de ${MAX_CARDS} cartas.`);
        return;
      }
    }

    if (cardCount >= MAX_DUPLICATES) {
      toast.error(`⚠️ No puedes agregar más de ${MAX_DUPLICATES} copias de "${card.name}".`);
      return;
    }

    if (cardCount >= userCardQuantity) {
      toast.error(
        `⚠️ No puedes añadir más de ${userCardQuantity} copias de "${card.name}" porque solo tienes ${userCardQuantity}.`,
      );
      return;
    }

    if (isFusionCard) {
      setSelectedFusionCards((prevCards) => [...prevCards, card]);
    } else {
      setSelectedCards((prevCards) => [...prevCards, card]);
    }
    // toast.success(`✅ "${card.name}" añadida al mazo.`);
  };

  const handleRemoveCard = (card) => {
    const isFusionCard = card.category.toLowerCase() === 'fusion';
    if (isFusionCard) {
      setSelectedFusionCards((prevCards) => prevCards.filter((c, index) => index !== prevCards.indexOf(card)));
    } else {
      setSelectedCards((prevCards) => prevCards.filter((c, index) => index !== prevCards.indexOf(card)));
    }
    toast.info(`"${card.name}" eliminada del mazo.`);
  };

  const handleSaveDeck = async () => {
    const formattedCards = selectedCards.reduce((acc, card) => {
      const existingCard = acc.find((c) => c.cardId === card.id);
      if (existingCard) {
        existingCard.amount += 1;
      } else {
        acc.push({ cardId: card.id, amount: 1 });
      }
      return acc;
    }, []);

    const formattedFusionCards = selectedFusionCards.reduce((acc, card) => {
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
      fusionCards: formattedFusionCards,
    };

    try {
      const token = localStorage.getItem('token');
      const savedDeck = await createDeck(payload, token);

      toast.success(`✅ Mazo "${savedDeck.deckTitle}" guardado con éxito.`);
      setDeckTitle('');
      setSelectedCards([]);
      setSelectedFusionCards([]);
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
          <CardsCollectedDisplay cards={Array.isArray(userCards) ? userCards : []} onAddCard={handleAddCard} />
        </div>
        <div className={styles.cardsSelectedWrapper}>
          <CardsSelectedDisplay
            normalCards={selectedCards}
            fusionCards={selectedFusionCards}
            onRemoveCard={handleRemoveCard}
          />
        </div>
      </div>
      <button
        disabled={
          deckTitle.trim() === '' || selectedCards.length > MAX_CARDS || selectedFusionCards.length > MAX_FUSION_CARDS
        }
        onClick={handleSaveDeck}
      >
        Guardar Mazo
      </button>
    </div>
  );
};

export default CreateNewDeck;
