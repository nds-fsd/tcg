require('dotenv').config();
const { Router } = require('express');
const { getCards, getCardById, createCard, updateCard, deleteCard } = require('../controllers/cardController');
const { jwtMiddleware } = require('../security/jwt');
const rolePath = process.env.ROLE_PATH;
const cardRouter = Router();

// SIN PROTEGER
cardRouter.get('/', getCards);
cardRouter.get('/:id', getCardById);

// PROTEGER para saber si es admin
cardRouter.post(`/${rolePath}/create`, jwtMiddleware, createCard);
cardRouter.put(`/${rolePath}/update/:id`, jwtMiddleware, updateCard);
cardRouter.delete(`/${rolePath}/delete/:id`, jwtMiddleware, deleteCard);

module.exports = { cardRouter };
