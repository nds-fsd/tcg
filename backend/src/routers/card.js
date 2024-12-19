const { Router } = require('express');
const { getCards, getCardById, createCard, updateCard, deleteCard } = require('../controllers/card.js');

const cardRouter = Router();

cardRouter.get('/', getCards);
cardRouter.post('/', createCard);
cardRouter.get('/:id', getCardById);
cardRouter.put('/:id', updateCard);
cardRouter.delete('/:id', deleteCard);

module.exports = { cardRouter };
