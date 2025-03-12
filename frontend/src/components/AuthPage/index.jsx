import styles from './authpage.module.css';
import AuthTitle from './AuthTitle';
import AuthFormSelector from './AuthFormSelector';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthPage = ({ forceUpdate, setForceUpdate }) => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className={styles.container}>
      <div className={styles.authContent}>
        <ToastContainer />
        <AuthTitle />
        <AuthFormSelector showLogin={showLogin} setShowLogin={setShowLogin} />
        <div className={styles.formContainer}>
          {showLogin ? (
            <LoginForm forceUpdate={() => setForceUpdate(!forceUpdate)} />
          ) : (
            <RegisterForm forceUpdate={() => setForceUpdate(!forceUpdate)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
