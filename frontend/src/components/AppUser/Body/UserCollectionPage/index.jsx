import styles from './userCollectionPage.module.css';
import PageTitle from '../Generic/PageTitle';
import CardItem from '../CreateNewDeck/CardItem';
import { useEffect, useState } from 'react';
import { fetchUserCollection } from '../../../../lib/utils/apiUserCollection';

const UserCollectionPage = () => {
  const [userCards, setUserCards] = useState([]);
  const [error, setError] = useState(null);

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

  if (error) return <p>{error}</p>;

  return (
    <div className={styles.bodyUserCollectionPageContainer}>
      <PageTitle title='Tu Colección' showAddIcon={false} placeholder='Escribe el nombre de la carta ...' />

      <div className={styles.cardsList}>
        {Object.values(userCards).length === 0 ? (
          <p>No tienes cartas en tu colección</p>
        ) : (
          Object.values(userCards).map((card) => (
            <div key={card.name} className={styles.cardWrapper}>
              <CardItem card={card} onAction={() => onAddCard(card)} actionLabel='+ Añadir' />
              {card.amount > 1 && (
                <div className={styles.cardAmount}>
                  <span>x{card.amount}</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserCollectionPage;
