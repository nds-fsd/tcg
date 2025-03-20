import styles from './userFriendsManagement.module.css';
import io from 'socket.io-client';
import { useState, useEffect } from 'react';
import { sendInvitation } from '../../../../../../../lib/utils/apiFrienship';
import { successToast, errorToast } from '../../../../../../../lib/toastify/toast';

const socket = io('http://localhost:3001');

const UserFriendsManagement = () => {
  const [friends, setFriends] = useState(['Juan Pérez', 'María López', 'Carlos Gómez', 'Ana Rodríguez']);
  const [friendRequests, setFriendRequests] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);

  // Usable
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [friendName, setFriendName] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Conectado al servidor de WebSocket');
    });

    return () => {
      socket.off('msg');
    };
  }, []);

  useEffect(() => {
    const Pong = (message) => {
      console.log('Message', message);
    };

    socket.on('ping', Pong);
    return () => {
      socket.off('ping', Pong);
    };
  }, []);

  const sendFriendRequest = async () => {
    try {
      console.log('Enviando solicitud a:', friendName);
      socket.emit('pong', {
        from: 'Client',
        body: 'Te mando un Pong',
      });

      await sendInvitation(friendName);

      setFriendName('');
      setIsModalOpen(false);
      successToast('Solicitud enviada con exito!!');
    } catch (e) {
      setIsModalOpen(false);
      if (e.status === 404) {
        errorToast('Usuario no existe');
      } else {
        errorToast('Error interno del servidor');
      }
    }
  };

  return (
    <div className={styles.friendContainer}>
      <div className={styles.sidebar}>
        <h2 className={styles.friendsTitle}>Amigos</h2>
        <ul className={styles.friendsList}>
          {friends.map((friend, index) => (
            <li key={index} className={styles.friendItem} onClick={() => setSelectedFriend(friend)}>
              {friend}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.friendMainContent}>
        <div>
          <h3 className={styles.friendSectionTitle}>Solicitudes de Amistad</h3>
          {friendRequests.length > 0 ? (
            <ul className={styles.friendRequestList}>
              {friendRequests.map((request, index) => (
                <li key={index} className={styles.friendRequestItem}>
                  {request}
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.friendNoRequests}>No tienes solicitudes de amistad.</p>
          )}
          <button className={styles.button} onClick={() => setIsModalOpen(true)}>
            Enviar solicitud de amistad
          </button>
        </div>

        {isModalOpen && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h3 className={styles.modalTitle}>Enviar solicitud de amistad</h3>
              <input
                type='text'
                className={styles.input}
                value={friendName}
                onChange={(e) => setFriendName(e.target.value)}
                placeholder='Escribe el nombre del usuario'
              />
              <button className={styles.button} onClick={sendFriendRequest}>
                Enviar Solicitud
              </button>
              <button className={styles.closeButton} onClick={() => setIsModalOpen(false)}>
                Cerrar
              </button>
            </div>
          </div>
        )}

        {selectedFriend && (
          <div className={styles.friendOptions}>
            <h3 className={styles.optionsTitle}>Opciones para {selectedFriend}</h3>
            <button className={styles.button}>PixelDuel</button>
            <button className={styles.button}>Intercambiar Cartas</button>
            <button
              className={styles.dangerButton}
              onClick={() => {
                setFriends(friends.filter((f) => f !== selectedFriend));
                setSelectedFriend(null);
              }}
            >
              Eliminar de Amigos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserFriendsManagement;
