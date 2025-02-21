import React, { useState, useEffect } from 'react';
import styles from './deckPage.module.css';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { getUserDecks } from '../../../../lib/utils/apiDeck';
import { useUser } from '../../../../context/userContext';

const DeckPage = () => {
  const { data } = useUser();
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const fetchDecks = async () => {
      if (!data?.id) return;
      try {
        const userDecks = await getUserDecks(data.id);
        setDecks(userDecks);
      } catch (error) {
        console.error('Error al obtener los mazos:', error);
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
        <div className={styles.deckContainer}>
          <img src='/assets/DeckImg/testdeck.png' alt='Imagen del mazo de cartas' />
        </div>
      </div>
    </div>
  );
};

export default DeckPage;
