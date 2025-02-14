import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { FaFireAlt, FaWater, FaMoon, FaMountain, FaSun, FaWind } from 'react-icons/fa';
import styles from './cardmodal.module.css';
import level1 from '../../../../../../public/assets/CardImg/1.png';
import level2 from '../../../../../../public/assets/CardImg/2.png';
import level3 from '../../../../../../public/assets/CardImg/3.png';
import level4 from '../../../../../../public/assets/CardImg/4.png';
import level5 from '../../../../../../public/assets/CardImg/5.png';
import level6 from '../../../../../../public/assets/CardImg/6.png';
import level7 from '../../../../../../public/assets/CardImg/7.png';
import level8 from '../../../../../../public/assets/CardImg/8.png';

const levelImages = [level1, level2, level3, level4, level5, level6, level7, level8];

const attributeIcons = {
  fire: FaFireAlt,
  water: FaWater,
  earth: FaMountain,
  darkness: FaMoon,
  light: FaSun,
  wind: FaWind,
};

const rarityColors = {
  legendary: '#ae8d0b',
  epic: 'purple',
  rare: '#B0B0B0',
  common: 'black',
};

const categoryColors = {
  monster: '#5c330a',
  support: '#8892c6',
  fusion: '#543c5a',
};

const rarityTranslations = {
  Legendaria: 'legendary',
  Épica: 'epic',
  Rara: 'rare',
  Común: 'common',
};

const categoryTranslations = {
  Monstruo: 'monster',
  Apoyo: 'support',
  Fusión: 'fusion',
};

const normalizeValue = (value, translations) => {
  return translations[value] || value.toLowerCase();
};

const EffectDisplay = ({ effect }) => (
  <ReactMarkdown>{effect.replace(/\n/g, '\n\n')}</ReactMarkdown>
);

const CardModal = ({ card, onClose }) => {
  const [showEffect, setShowEffect] = useState(false);
  const toggleView = () => setShowEffect((prev) => !prev);

  const { name, image, type, rarity, attribute, description, category, expansion, atk, def, effect, level } = card;

  console.log("📌 Contenido de effect en CardModal:", effect);

  const normalizedRarity = normalizeValue(rarity, rarityTranslations);
  const normalizedCategory = normalizeValue(category, categoryTranslations);

  const AttributeIcon = attributeIcons[attribute?.toLowerCase()];
  const rarityColor = rarityColors[normalizedRarity] || 'gray';
  const categoryColor = categoryColors[normalizedCategory] || '#1a1a1a';

  return (
    <div className={styles.modalBackground} onClick={onClose}>
      <div className={styles.modalWrapper}>
      <div
        className={styles.modalContent}
        style={{
          borderColor: rarityColor,
          backgroundColor: categoryColor,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Nivel */}
        {level && (
          <div className={styles.levelBadge}>
            <img src={levelImages[level - 1]} alt={`Nivel ${level}`} />
          </div>
        )}

         {/* Rareza */}
         <div className={styles.rarityBadge} style={{ backgroundColor: rarityColor }}>
           {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
         </div>
         {/* Imagen */}
         <div className={styles.cardImageContainer}>
           <img src={image} alt={name} className={styles.modalImage} />
         </div>

         {/* Detalles */}
         <div className={styles.cardDetails}>
           <div className={styles.cardHeader}>
             <h2 className={styles.cardName}>{name}</h2>
             {AttributeIcon && <AttributeIcon className={styles.attributeIcon} />}
           </div>

           {/* Type y Botón */}
           <div className={styles.typeAndButtonContainer}>
             <p className={styles.cardType}>{type}</p>
             <button className={styles.switchButton} onClick={toggleView}>
               {showEffect ? 'Mostrar descripción' : 'Mostrar efecto'}
             </button>
           </div>

           {/* Descripción/Efecto */}
           <div className={styles.cardText}>
              {showEffect ? <EffectDisplay effect={effect} /> : <p>{description}</p>}
            </div>

          {/* Expansión y ATK/DEF */}
          <div className={styles.cardFooter}>
            <p className={styles.expansion}>{expansion}</p>
            {(atk || def) && (
              <p className={styles.atkDef}>
                {atk || '0'} / {def || '0'}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className={styles.cardInfoBox}>
    <h2 className={styles.cardInfoName}>{name}</h2>
    <div className={styles.infoRow}>
      <p className={styles.cardInfoCategory}>{category}</p>
      {AttributeIcon && <AttributeIcon className={styles.attributeInfoIcon} />}
      <p className={styles.cardInfoType}>{type}</p>
    </div>
    <p className={styles.cardDescription}>Descripción: {description}</p>
    <p className={styles.cardDescription}>Efecto: <EffectDisplay effect={effect} /></p>
  </div>
      </div>
    </div>
  );
};

export default CardModal;
