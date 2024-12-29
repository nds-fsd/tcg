import React from 'react';
import styles from './button.module.css';

const Button = ({ type = 'button', text, onClick, disabled = false }) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${disabled ? styles.disabled : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
