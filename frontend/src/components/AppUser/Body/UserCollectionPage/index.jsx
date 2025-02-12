// import styles from './userCollectionPage.module.css';
// import PageTitle from '../Generic/PageTitle';
// import { useEffect, useState } from 'react';
// import { fetchUserCollection } from '../../../../lib/utils/apiUserCollection';

// const UserCollectionPage = () => {
//   const [userCards, setUserCards] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getUserCards = async () => {
//       try {
//         const response = await fetchUserCollection();
//         console.log(response);
//         setUserCards(response.map(({ cardId, amount }) => ({ ...cardId, quantity: amount })));
//       } catch (e) {
//         console.error('Error fetching user collection:', e);
//         setError('Error al cargar las cartas');
//       } finally {
//         setLoading(false);
//       }
//     };

//     getUserCards();
//   }, []);

//   if (loading) return <p>Cargando cartas...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className={styles.bodyUserCollectionPageContainer}>
//       <PageTitle title='Pixel Quest' showAddIcon={false} placeholder='Escribe el nombre de la carta ...' />

//       {userCards.length === 0 ? (
//         <p>No tienes cartas en tu colección</p>
//       ) : (
//         <div>
//           {userCards.map((card, index) => (
//             <div key={index}>
//               <p>{card.name || 'Carta sin nombre'} - Cantidad: {card.quantity}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserCollectionPage;
