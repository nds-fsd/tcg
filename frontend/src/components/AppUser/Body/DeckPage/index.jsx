import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './deckPage.module.css';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { getUserDecks } from '../../../../lib/utils/apiDeck';
import { useUser } from '../../../../context/userContext';

const deckImages = [
  '/assets/DeckImg/deck1.png',
  '/assets/DeckImg/deck2.png',
  '/assets/DeckImg/deck3.png',
  '/assets/DeckImg/deck4.png',
  '/assets/DeckImg/deck5.png',
];

const DeckPage = () => {
  const { data } = useUser();
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDecks = async () => {
      if (!data?._id) return;
      try {
        const userDecks = await getUserDecks(data._id);
        setDecks(userDecks);
      } catch (e) {
        toast.error('Error al cargar los mazos. Inténtalo más tarde.', {
          position: 'top-right',
          autoClose: 2000,
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

    fetchDecks();
  }, [data]);

  return (
    <div className={styles.deckPageContainer}>
      <ToastContainer theme='dark' />

      <header className={styles.deckPageTitle}>
        <h1>Mazos</h1>
      </header>

      <div className={styles.deckPageDeck}>
        <div className={styles.deckContainer}>
          <Link to='/controldeck' className={styles.plusContainer}>
            <BsPlusCircleDotted className={styles.plus} />
          </Link>
        </div>

        {loading ? (
          <p>Cargando mazos...</p>
        ) : decks.length > 0 ? (
          decks.map((deck, index) => (
            <Link key={deck._id} to={`/deck/${deck._id}`} className={styles.deckContainer}>
              <img src={deckImages[index % deckImages.length]} alt={`Mazo: ${deck.deckTitle}`} />
              <p className={styles.deckTitle}>{deck.deckTitle}</p>
            </Link>
          ))
        ) : (
          <p>Aún no has creado ningún mazo.</p>
        )}
      </div>
    </div>
  );
};

export default DeckPage;
