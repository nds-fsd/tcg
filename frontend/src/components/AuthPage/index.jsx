import styles from './authpage.module.css';
import { useState } from 'react';
import AuthTitle from './AuthTitle';
import AuthFormSelector from './AuthFormSelector';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthPage = ({ forceUpdate, setForceUpdate }) => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className={styles.container}>
      <div className={styles.authContent}>
        <AuthTitle />
        <AuthFormSelector showLogin={showLogin} setShowLogin={setShowLogin} />
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
