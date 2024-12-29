import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import styles from './registerform.module.css';

const RegisterForm = ({ onRegister }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await onRegister(data);
      alert(
        'Registro exitoso. Por favor, verifica tu correo electrónico para validar tu cuenta (revisa la carpeta de spam si no lo encuentras).',
      );
    } catch (error) {
      console.error('Error en el registro:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.field}>
        <label htmlFor='name'>Nombre de usuario:</label>
        <input
          type='text'
          id='name'
          {...register('username', {
            required: 'El nombre es obligatorio',
            minLength: {
              value: 2,
              message: 'El nombre debe tener al menos 2 caracteres',
            },
          })}
        />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor='email'>Correo electrónico:</label>
        <input
          type='email'
          id='email'
          {...register('email', {
            required: 'El correo es obligatorio',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Formato de correo inválido',
            },
          })}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor='password'>Contraseña:</label>
        <input
          type='password'
          id='password'
          {...register('password', {
            required: 'La contraseña es obligatoria',
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
              message: 'Debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número',
            },
          })}
        />
        {errors.password && <p className={styles.error}>{errors.password.message}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor='confirmPassword'>Confirma tu contraseña:</label>
        <input
          type='password'
          id='confirmPassword'
          {...register('confirmPassword', {
            required: 'La confirmación es obligatoria',
            validate: (value, allValues) => value === allValues.password || 'Las contraseñas no coinciden',
          })}
        />
        {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword.message}</p>}
      </div>

      <div className={styles.actions}>
        <Button type='submit' text={loading ? 'Registrando...' : 'Registrarse'} disabled={loading} />
      </div>
      <p>By continuing, you agree to our Terms of Service and Privacy Policy.</p>
    </form>
  );
};

export default RegisterForm;
