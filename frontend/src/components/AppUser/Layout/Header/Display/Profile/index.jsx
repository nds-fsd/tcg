import styles from './profile.module.css';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useUser } from '../../../../../../context/userContext';
import { updateUser } from '../../../../../../lib/utils/apiUser';
import { successToast, errorToast } from '../../../../../../lib/toastify/toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileEditForm = () => {
  const { data } = useUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  useEffect(() => {
    if (data) {
      setValue('userName', data.userName);
      setValue('email', data.email);
      if (data.birthDate) {
        const formattedDate = new Date(data.birthDate).toISOString().split('T')[0];
        setValue('birthDate', formattedDate);
      }
    }
  }, [data, setValue]);

  const onSubmit = async (formData) => {
    try {
      const response = await updateUser(formData);
      navigate('/');
      successToast('Datos actualizados correctamente');
    } catch (e) {
      if (e.status === 400) {
        errorToast('Solicitud incorrecta');
      } else if (e.status === 401) {
        errorToast('Sin autorización necesaria');
      } else {
        errorToast('Interno del servidor');
      }
    }
  };

  if (!data) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      <ToastContainer theme='dark' />
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.formTitle}>Editar Perfil</h2>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor='userName'>
            Nombre de Usuario:
          </label>
          <input
            className={styles.input}
            id='userName'
            type='text'
            placeholder='Nombre de usuario'
            {...register('userName', { required: 'El nombre de usuario es obligatorio' })}
          />
          {errors.userName && <p className={styles.error}>{errors.userName.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor='email'>
            Correo Electrónico:
          </label>
          <input
            className={styles.input}
            id='email'
            type='email'
            placeholder='Correo electrónico'
            {...register('email', { required: 'El correo electrónico es obligatorio' })}
          />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor='profilePicture'>
            Foto de Perfil:
          </label>
          <input className={styles.input} id='profilePicture' type='file' {...register('profilePicture')} />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor='birthDate'>
            Fecha de Nacimiento:
          </label>
          <input
            className={styles.input}
            id='birthDate'
            type='date'
            {...register('birthDate', {
              validate: (value) => {
                const selectedDate = new Date(value);
                const currentDate = new Date();
                if (selectedDate >= currentDate) {
                  return 'La fecha debe ser anterior a la fecha actual';
                }
                return true;
              },
            })}
          />
          {errors.birthDate && <p className={styles.error}>{errors.birthDate.message}</p>}
        </div>

        <button className={styles.button} type='submit'>
          Guardar Cambios
        </button>
      </form>
    </>
  );
};

export default ProfileEditForm;
