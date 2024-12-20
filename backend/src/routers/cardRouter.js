const { Router } = require('express');
const { getCards, getCardById, createCard, updateCardById, deleteCard } = require('../controllers/cardController');

const cardRouter = Router();

cardRouter.get('/', getCards);
cardRouter.get('/:id', getCardById);
cardRouter.post('/', createCard);
cardRouter.put('/:id', updateCardById);
cardRouter.delete('/:id', deleteCard);

module.exports = { cardRouter };
