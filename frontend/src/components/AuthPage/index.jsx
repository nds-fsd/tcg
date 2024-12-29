import React, { useState } from 'react';
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';
import styles from './authpage.module.css';
import AuthTitle from '../AuthTitle';

const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(true);

  const handleLogin = async (data) => {
    try {
      console.log('Datos del login:', data);
      alert('Inicio de sesión exitoso');
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
    }
  };

  const handleRegister = async (data) => {
    try {
      console.log('Datos del registro:', data);
      alert(
        'Registro exitoso. Por favor, verifica tu correo electrónico para validar tu cuenta (revisa la carpeta de spam si no lo encuentras).',
      );
    } catch (error) {
      console.error('Error en el registro:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.authContent}>
        <AuthTitle />
        <div>
          <div className={styles.tabs}>
            <button className={`${styles.tab} ${showLogin ? styles.active : ''}`} onClick={() => setShowLogin(true)}>
              Iniciar Sesión
            </button>
            <button className={`${styles.tab} ${!showLogin ? styles.active : ''}`} onClick={() => setShowLogin(false)}>
              Registrarse
            </button>
          </div>
        </div>

        <div className={styles.formContainer}>
          {showLogin ? <LoginForm onLogin={handleLogin} /> : <RegisterForm onRegister={handleRegister} />}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
