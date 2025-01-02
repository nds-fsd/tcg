import React, { useState } from 'react';
import styles from './decktitle.module.css'

function DeckTitle({ onTitleChange }) {
    const [title, setTitle] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');

    const handleTextChange = (event) => {
        const newTitle = event.target.value;
        if (newTitle.length > 20) {
            setError('El título no puede superar los 20 caracteres.');
        } else {
            setError('');
            setTitle(newTitle);
        }
    };

    const handleSave = () => {
        if (title.trim() === '') {
            setError('El título no puede estar vacío.');
            return;
        }
        setError('');
        onTitleChange(title.trim());
        setIsEditing(false);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSave();
        }
    };

    return (
        <div className={styles.deckTitle}>
            {isEditing ? (
                <input
                    type="text"
                    value={title}
                    onChange={handleTextChange}
                    onKeyDown={handleKeyDown}
                    onBlur={handleSave}
                    className={styles.titleInput}
                    autoFocus
                />
            ) : (
                <h1
                    className={styles.titleText}
                    onClick={() => setIsEditing(true)}
                >
                    {title || 'Haz clic para añadir un título'}
                </h1>
            )}
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
}

export default DeckTitle;