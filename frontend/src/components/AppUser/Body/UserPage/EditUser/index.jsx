import styles from './editUser.module.css';
import { useState } from 'react';
import { updateUser } from '../../../../../lib/utils/apiUser';
import EditButton from '../../Generic/EditButton';

const EditUser = ({ user, handleUpdate }) => {
  const [form, setForm] = useState({
    userName: user.userName,
    email: user.email,
    level: user.level,
    roles: user.roles,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: updatedUser } = await updateUser(user._id, form);
      handleUpdate(updatedUser); // Actualiza la lista en UserPage
      setIsModalOpen(false);
    } catch (error) {
      alert(`Error al editar el usuario: ${error.message}`);
    }
  };

  return (
    <>
      <EditButton onClick={() => setIsModalOpen(true)} />

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Editar Usuario</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Nombre de Usuario:
                <input
                  type='text'
                  value={form.userName}
                  onChange={(e) => setForm({ ...form, userName: e.target.value })}
                />
              </label>
              <label>
                Correo Electrónico:
                <input type='email' value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </label>
              <label>
                Nivel:
                <input
                  type='number'
                  value={form.level}
                  onChange={(e) => setForm({ ...form, level: parseInt(e.target.value, 10) })}
                />
              </label>
              <label>
                Rol:
                <select value={form.roles} onChange={(e) => setForm({ ...form, roles: e.target.value })}>
                  <option value='user'>Usuario</option>
                  <option value='admin'>Administrador</option>
                </select>
              </label>
              <div className={styles.buttons}>
                <button type='submit' className={styles.saveButton}>
                  Guardar
                </button>
                <button type='button' onClick={() => setIsModalOpen(false)} className={styles.cancelButton}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditUser;
