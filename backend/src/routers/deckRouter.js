require('dotenv').config();
const { Router } = require('express');
// // const { getDecksUser, getDeckById, createDeck, updateDeck, deleteDeck } = require('../controllers/deckController');
// // const { jwtMiddleware } = require('../security/jwt');
const rolePath = process.env.ROLE_PATH;
const deckRouter = Router();

// protegido para sabes si eres el usuario que dices ser o admin
deckRouter.get('/user', middlewarePerPublicOElUserEsCorrecte, getAllUserDecks);
deckRouter.get('user/:deckId', middlewarePerPublicOElUserEsCorrecte, getDeckById);
deckRouter.post('/create', jwtMiddlewareSabeTokeOAdmin, createDeck);
deckRouter.put('/:id', jwtMiddlewareSabeTokeOAdmin, updateDeck);
deckRouter.delete('/:id', jwtMiddlewareSabeTokeOAdmin, deleteDeck);

module.exports = { deckRouter };