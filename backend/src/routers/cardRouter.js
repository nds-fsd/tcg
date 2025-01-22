const { Router } = require('express');
const { getCards, getCardById, createCard, updateCard, deleteCard } = require('../controllers/cardController');
const { jwtMiddleware } = require('../security/jwt');

const cardRouter = Router();

cardRouter.get('/', getCards);
cardRouter.post('/', jwtMiddleware, createCard);
cardRouter.get('/:id', getCardById);
cardRouter.put('/:id', jwtMiddleware, updateCard);
cardRouter.delete('/:id', jwtMiddleware, deleteCard);

module.exports = { cardRouter };
