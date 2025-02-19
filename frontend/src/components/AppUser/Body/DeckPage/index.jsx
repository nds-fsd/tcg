import styles from './deckPage.module.css';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import PageTitle from '../Generic/PageTitle';

const DeckPage = () => {
  return (
    <div className={styles.deckPageContainer}>
      <PageTitle
        title='Mazos'
        showAddIcon={false}
        showSercher={false}
      />
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
