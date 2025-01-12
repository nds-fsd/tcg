import styles from './userCollectionPage.module.css';
import PageTitle from '../Generic/PageTitle';

const UserCollectionPage = () => {
  return (
    <div className={styles.bodyUserCollectionPageContainer}>
      <PageTitle title='Pixelex' showAddIcon={false} placeholder='Escribe el nombre de la carta ...' />
    </div>
  );
};

export default UserCollectionPage;
