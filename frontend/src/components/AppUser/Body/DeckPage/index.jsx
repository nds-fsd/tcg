import { useState, useEffect } from 'react';
import styles from './deckPage.module.css';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { getUserDecks } from '../../../../lib/utils/apiDeck';
import { useUser } from '../../../../context/userContext';

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
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
  
    fetchDecks();
  }, [data]);
  
  return (
    <div className={styles.deckPageContainer}>
      <header className={styles.deckPageTitle}>
        <h1>Mazos</h1>
      </header>
      
      <div className={styles.deckPageDeck}>
        <div className={styles.deckPlusContainer}>
          <Link to='/controldeck' className={styles.navLink}>
            <BsPlusCircleDotted className={styles.plus} />
          </Link>
        </div>
        
        {loading ? (
          <p className={styles.loadingMessage}>Cargando mazos...</p>
        ) : decks.length > 0 ? (
          decks.map((deck) => (
            <Link key={deck._id} to={`/deck/${deck._id}`} className={styles.deckContainer}>
              <img src='/assets/DeckImg/testdeck.png' alt={`Mazo: ${deck.deckTitle}`} />
              <p className={styles.deckTitle}>{deck.deckTitle}</p>
            </Link>
          ))
        ) : (
          <p className={styles.noDecksMessage}>Aún no has creado ningún mazo.</p>
        )}
      </div>
    </div>
  );
};

export default DeckPage;
