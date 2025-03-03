import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeckTitle from './DeckTitle';
import { fetchUserCollection } from '../../../../lib/utils/apiUserCollection';
import { fetchDeck, createDeck, updateDeck } from '../../../../lib/utils/apiDeck';
import CardsCollectedDisplay from './CardsCollectedDisplay';
import CardsSelectedDisplay from './CardsSelectedDisplay';
import styles from './createnewdeck.module.css';
import { getUserToken } from '../../../../lib/utils/localStorage.utils';

const MAX_CARDS = 40;
const MAX_FUSION_CARDS = 10;
const MAX_DUPLICATES = 3;

const CreateNewDeck = () => {
  const { deckId } = useParams();
  const [deckTitle, setDeckTitle] = useState('');
  const [selectedCards, setSelectedCards] = useState([]);
  const [selectedFusionCards, setSelectedFusionCards] = useState([]);
  const [userCards, setUserCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserCards = async () => {
      try {
        const response = await fetchUserCollection();
        setUserCards(response.map(({ cardId, amount }) => ({ ...cardId, id: cardId._id, amount })));
      } catch (e) {
        toast.error('Error al cargar las cartas.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      }
    };

    getUserCards();
  }, []);

  useEffect(() => {
    if (!deckId) return setLoading(false);

    const loadDeck = async () => {
      try {
        const deckData = await fetchDeck(deckId);
        if (deckData) {
          setDeckTitle(deckData.deckTitle);
          setSelectedCards(deckData.cards.map((c) => ({ id: c.card._id, ...c.card, amount: c.amount })));
          setSelectedFusionCards(deckData.fusionCards.map((c) => ({ id: c.card._id, ...c.card, amount: c.amount })));
        }
      } catch (error) {
        toast.error('Error al cargar el mazo.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      } finally {
        setLoading(false);
      }
    };

    loadDeck();
  }, [deckId]);

  const handleTitleChange = (newTitle) => setDeckTitle(newTitle);

  const handleAddCard = (card) => {
    const userCard = userCards.find((c) => c.id === card.id);

    const userCardQuantity = userCard ? userCard.amount : 0;

    const isFusionCard = card.category.toLowerCase() === 'fusion';
    const selectedArray = isFusionCard ? selectedFusionCards : selectedCards;
    const setSelectedArray = isFusionCard ? setSelectedFusionCards : setSelectedCards;
    const cardIndex = selectedArray.findIndex((c) => c.id === card.id);

    if (cardIndex !== -1) {
      const updatedSelection = [...selectedArray];

      if (updatedSelection[cardIndex].amount >= MAX_DUPLICATES) {
        toast.error(`No puedes agregar más de ${MAX_DUPLICATES} copias de "${card.name}".`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        return;
      }
      if (updatedSelection[cardIndex].amount >= userCardQuantity) {
        toast.error(`No puedes añadir más de ${userCardQuantity} copias de "${card.name}".`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        return;
      }

      updatedSelection[cardIndex] = {
        ...updatedSelection[cardIndex],
        amount: updatedSelection[cardIndex].amount + 1,
      };

      setSelectedArray([...updatedSelection]);
    } else {
      if (isFusionCard && selectedFusionCards.length >= MAX_FUSION_CARDS) {
        toast.error(`No puedes añadir más de ${MAX_FUSION_CARDS} cartas de fusión.`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        return;
      }
      if (!isFusionCard && selectedCards.length >= MAX_CARDS) {
        toast.error(`No puedes añadir más de ${MAX_CARDS} cartas.`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        return;
      }
      setSelectedArray([...selectedArray, { ...card, amount: 1 }]);
    }
  };

  const handleRemoveCard = (card) => {
    const isFusionCard = card.category.toLowerCase() === 'fusion';
    const selectedArray = isFusionCard ? selectedFusionCards : selectedCards;
    const setSelectedArray = isFusionCard ? setSelectedFusionCards : setSelectedCards;

    const updatedSelection = selectedArray
      .map((c) => (c.id === card.id ? { ...c, amount: c.amount - 1 } : c))
      .filter((c) => c.amount > 0);

    setSelectedArray(updatedSelection);

    toast.info(`"${card.name}" eliminada del mazo.`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  };

  const handleSaveDeck = async () => {
    const formattedDeck = {
      deckTitle: deckTitle.trim(),
      cards: selectedCards.map(({ id, amount }) => ({ card: id, amount })),
      fusionCards: selectedFusionCards.map(({ id, amount }) => ({ card: id, amount })),
    };

    const token = getUserToken();

    if (!token) {
      toast.error('No estás autenticado. Inicia sesión nuevamente.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      return;
    }

    try {
      const savedDeck = deckId ? await updateDeck(deckId, formattedDeck) : await createDeck(formattedDeck);
      toast.success(`Mazo "${savedDeck.deckTitle}" ${deckId ? 'actualizado' : 'guardado'} con éxito.`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    } catch (error) {
      toast.error('Error al guardar el mazo. Inténtalo de nuevo.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  };

  return (
    <div className={styles.createNewDeck}>
      <ToastContainer theme='dark' />

      {loading ? (
        <p className={styles.loadingMessage}>Cargando mazo...</p>
      ) : (
        <>
          <DeckTitle value={deckTitle} onTitleChange={handleTitleChange} />
          <div className={styles.deckContent}>
            <div className={styles.cardsCollectedWrapper}>
              <CardsCollectedDisplay cards={userCards} onAddCard={handleAddCard} />
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
            className={styles.saveDeckButton}
            disabled={
              deckTitle.trim() === '' ||
              selectedCards.length > MAX_CARDS ||
              selectedFusionCards.length > MAX_FUSION_CARDS
            }
            onClick={handleSaveDeck}
          >
            {deckId ? 'Actualizar Mazo' : 'Guardar Mazo'}
          </button>
        </>
      )}
    </div>
  );
};

export default CreateNewDeck;
