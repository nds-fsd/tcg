import styles from './userList.module.css';
import UserActions from '../UserActions';

const UserList = ({ filteredUsers, handleUpdate, handleDelete }) => {
  return (
    <div className={styles.userPageList}>
      <div className={styles.userListTitle}>
        <h3>Nombre de Usuario</h3>
        <h3>Correo Electrónico</h3>
        <h3>Nivel</h3>
        <h3>Perfil</h3>
        <h3>Acciones</h3>
      </div>
      {/* Lista de Usuarios */}
      <ul className={styles.userPageRows}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <li key={user._id} className={styles.userPageRow}>
              <div className={styles.userField}>
                <img className={styles.userImg} src={user.img} alt='No img' />
              </div>
              <div className={styles.userField}>{user.userName}</div>
              <div className={styles.userField}>{user.email}</div>
              <div className={styles.userField}>{user.level}</div>
              <div className={styles.userField}>{user.roles}</div>
              <UserActions user={user} handleUpdate={handleUpdate} handleDelete={handleDelete} />
            </li>
          ))
        ) : (
          <li className={styles.emptyMessage}>No hay usuarios.</li>
        )}
      </ul>
    </div>
  );
};

export default UserList;
