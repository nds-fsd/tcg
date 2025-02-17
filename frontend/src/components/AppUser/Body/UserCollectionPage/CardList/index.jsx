import PropTypes from 'prop-types';
import { fetchUserCollection } from '../../../../../lib/utils/apiUserCollection';

const CardList = ({ cards }) => {
  if (!cards || cards.length === 0) {
    return <p>No tienes cartas en tu colección</p>;
  }

  return (
    <div>
      {cards.map((card, index) => (
        <div key={index}>
          <p>
            {card.name || 'Carta sin nombre'} - Cantidad: {card.amount}
          </p>
        </div>
      ))}
    </div>
  );
};

CardList.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      amount: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default CardList;
