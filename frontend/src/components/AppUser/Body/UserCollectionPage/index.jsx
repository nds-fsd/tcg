import styles from './userCollectionPage.module.css';
import PageTitle from '../Generic/PageTitle';
import CardList from './CardList';
import { useEffect, useState } from 'react';
import { fetchUserCollection } from '../../../../lib/utils/apiUserCollection';

const UserCollectionPage = () => {
    const [userCards, setUserCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUserCards = async () => {
            try {
                const response = await fetchUserCollection();
                setUserCards(response.map(({ cardId, amount }) => ({ ...cardId, quantity: amount })));
            } catch (e) {
                setError('Error al cargar las cartas');
            } finally {
                setLoading(false);
            }
        };

        getUserCards();
    }, []);

    if (loading) return <p>Cargando cartas...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className={styles.bodyUserCollectionPageContainer}>
            <PageTitle title='Tu Colección' showAddIcon={false} placeholder='Escribe el nombre de la carta ...' />
            <div className={styles.cardListContainer}>

            </div>
            {/* <CardList cards={userCards} /> */}
        </div>
    );
};

export default UserCollectionPage;