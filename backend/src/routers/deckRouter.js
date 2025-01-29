const { Router } = require('express');
const { getDecksUser, getDeckById, createDeck, updateDeck, deleteDeck } = require('../controllers/deckController');
const { jwtMiddleware } = require('../security/jwt');

const deckRouter = Router();

deckRouter.get('/user/:id', getDecksUser);
deckRouter.get('/:id', getDeckById);
deckRouter.post('/', jwtMiddleware, createDeck);
deckRouter.put('/:id', jwtMiddleware, updateDeck);
deckRouter.delete('/:id', jwtMiddleware, deleteDeck);

module.exports = { deckRouter };
