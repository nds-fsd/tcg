import styles from './deckPage.module.css';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const DeckPage = () => {
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
