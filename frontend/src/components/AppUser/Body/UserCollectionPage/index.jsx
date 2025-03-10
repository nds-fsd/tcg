import styles from './userCollectionPage.module.css';
import PageTitle from '../Generic/PageTitle';
import { useEffect, useState } from 'react';
import { fetchUserCollection } from '../../../../lib/utils/apiUserCollection';
import { toast, ToastContainer } from 'react-toastify';
import CardsCollectedDisplay from '../CreateNewDeck/CardsCollectedDisplay';
import 'react-toastify/dist/ReactToastify.css';

const UserCollectionPage = () => {
  const [userCards, setUserCards] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserCards = async () => {
      try {
        const response = await fetchUserCollection();
        setUserCards(response.map(({ cardId, amount }) => ({ ...cardId, id: cardId._id, amount: amount })));
      } catch (e) {
        toast.error('Error al cargar las cartas');
      }
    };

    getUserCards();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className={styles.bodyUserCollectionPageContainer}>
      <PageTitle title='Tu Colección' showAddIcon={false} showSercher={false} />
      <div className={styles.cardsCollectedWrapper}>
        <CardsCollectedDisplay cards={Array.isArray(userCards) ? userCards : []} addCard={false} />
      </div>

      <ToastContainer position='top-right' autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover />
    </div>
  );
};

export default UserCollectionPage;
