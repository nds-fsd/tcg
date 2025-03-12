import styles from './userModal.module.css';
import { useNavigate } from 'react-router-dom';
import { removeSession } from '../../../../../../lib/utils/userSession';

const UserModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogout = () => {
    removeSession();
    navigate('/auth');
  };

  return (
    <div className={styles.modalUser} onClick={onClose}>
      <button onClick={() => navigate('/profile')}>Perfil de usuario</button>
      <button onClick={() => navigate('/purchase-history')}>Historial de Compras</button>
      {/*<button onClick={() => navigate('/market-history')}>Historial de Mercado Libre</button>
        <button onClick={() => navigate('/stats')}>Trofeos</button>
      <button onClick={() => navigate('/stats')}>Estadísticas</button> 
      <button onClick={() => navigate('/friends')}>Amigos</button>*/}
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default UserModal;
