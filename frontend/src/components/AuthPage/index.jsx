import styles from './authpage.module.css';
import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import AuthTitle from './AuthTitle';

const AuthPage = ({ forceUpdate, setForceUpdate }) => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className={styles.container}>
      <div className={styles.authContent}>
        <AuthTitle />

        <div className={styles.tabs}>
          <button className={`${styles.tab} ${showLogin ? styles.active : ''}`} onClick={() => setShowLogin(true)}>
            Iniciar Sesión
          </button>
          <button className={`${styles.tab} ${!showLogin ? styles.active2 : ''}`} onClick={() => setShowLogin(false)}>
            Registrarse
          </button>
        </div>

        <div className={styles.formContainer}>
          {showLogin ? (
            <LoginForm
              forceUpdate={() => setForceUpdate(!forceUpdate)}
              onSubmit={(data) => loginMutation.mutate(data)}
            />
          ) : (
            <RegisterForm
              forceUpdate={() => setForceUpdate(!forceUpdate)}
              onSubmit={(data) => registerMutation.mutate(data)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
