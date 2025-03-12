import styles from './userIcon.module.css';
import UserModal from './UserModal';
import { IoNotifications } from 'react-icons/io5';
import { useUser } from '../../../../../context/userContext';
import { useEffect, useState } from 'react';

const UserIcon = () => {
  const { data } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${styles.userIconImage}`)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <div className={styles.userContainer}>
      <div className={styles.notification}>
        <IoNotifications />
      </div>

      <div className={styles.userIconImage} onClick={() => setIsModalOpen(!isModalOpen)}>
        {data?.profilePicture ? (
          <img src={data.profilePicture} alt='Foto de perfil' />
        ) : (
          <img src='/assets/default-icon.png' alt='Icono predeterminado' />
        )}
      </div>

      <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default UserIcon;
