import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import styles from './loginform.module.css';

const LoginForm = ({ onLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await onLogin(data);
    } catch (error) {
      console.error('Error en el login:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
            minLength: {
              value: 8,
              message: 'Debe tener al menos 8 caracteres',
            },
          })}
        />
        {errors.password && <p className={styles.error}>{errors.password.message}</p>}
      </div>

      <div className={styles.actions}>
        <Button type='submit' text={loading ? 'Cargando...' : 'Iniciar Sesión'} disabled={loading} />
      </div>
      <p>By continuing, you agree to our Terms of Service and Privacy Policy.</p>
    </form>
  );
};

export default LoginForm;
