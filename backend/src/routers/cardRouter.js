const { Router } = require('express');
const { getCards, getCardById, createCard, updateCard, deleteCard } = require('../controllers/cardController');

const cardRouter = Router();

cardRouter.get('/', getCards);
cardRouter.get('/:id', getCardById);
cardRouter.post('/', createCard);
cardRouter.put('/:id', updateCard);
cardRouter.delete('/:id', deleteCard);

module.exports = { cardRouter };
