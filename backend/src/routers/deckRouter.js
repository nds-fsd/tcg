require('dotenv').config();
const { Router } = require('express');
const { getDecksUser, getDeckById, createDeck, updateDeck, deleteDeck } = require('../controllers/deckController');
const { jwtMiddleware } = require('../security/jwt');
// // const { jwtMiddleware } = require('../security/jwt');
const rolePath = process.env.ROLE_PATH;
const deckRouter = Router();

// protegido para sabes si eres el usuario que dices ser o admin
// deckRouter.get('/user', getAllUserDecks);
deckRouter.get('user/:deckId', getDeckById);
deckRouter.post('/create',jwtMiddleware, createDeck);
deckRouter.put('/:id', updateDeck);
deckRouter.delete('/:id', deleteDeck);

module.exports = { deckRouter };