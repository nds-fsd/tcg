const { Router } = require('express');
const { getDecksUser, getDeckById, createDeck, updateDeck, deleteDeck } = require('../controllers/deckController');
const { jwtMiddleware } = require('../security/jwt');
const deckRouter = Router();

// protegido para sabes si eres el usuario que dices ser o admin
// deckRouter.get('/user', getAllUserDecks);
deckRouter.get('/user', jwtMiddleware, getDecksUser);
deckRouter.get('/user/:id', getDeckById);
deckRouter.post('/', jwtMiddleware, createDeck);
deckRouter.put('/update/:id', jwtMiddleware, updateDeck);
deckRouter.delete('/:id', deleteDeck);

module.exports = { deckRouter };
