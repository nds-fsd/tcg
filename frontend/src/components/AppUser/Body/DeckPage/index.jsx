import styles from './deckPage.module.css';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const DeckPage = () => {
  return (
    <div className={styles.deckPageContainer}>
      <div className={styles.deckPageTitle}>
        <h1>Decks</h1>
      </div>
      <div className={styles.deckPageDeck}>
        <div className={styles.deckPlusContainer}>
          <Link to='/controldeck' className={styles.navLink}>
            <BsPlusCircleDotted className={styles.plus} />
          </Link>
        </div>
        <div className={styles.deckContainer}>
          <img src='../../../../../public/assets/DeckImg/testdeck.png' alt='not found' />
        </div>
        <div className={styles.deckContainer}>
          <img src='../../../../../public/assets/DeckImg/testdeck.png' alt='not found' />
        </div>
        <div className={styles.deckContainer}>
          <img src='../../../../../public/assets/DeckImg/testdeck.png' alt='not found' />
        </div>
        <div className={styles.deckContainer}>
          <img src='../../../../../public/assets/DeckImg/testdeck.png' alt='not found' />
        </div>
        <div className={styles.deckContainer}>
          <img src='../../../../../public/assets/DeckImg/testdeck.png' alt='not found' />
        </div>
        <div className={styles.deckContainer}>
          <img src='../../../../../public/assets/DeckImg/testdeck.png' alt='not found' />
        </div>
      </div>
    </div>
  );
};

export default DeckPage;
