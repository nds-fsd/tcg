const { Router } = require('express');
const { getDecksUser, createDeck, updateDeck, deleteDeck } = require('../controllers/deckController');
const { jwtMiddleware } = require('../security/jwt');

const deckRouter = Router();

deckRouter.get('/:id', getDecksUser);
deckRouter.post('/', jwtMiddleware, createDeck);
deckRouter.put('/:id', jwtMiddleware, updateDeck);
deckRouter.delete('/:id', jwtMiddleware, deleteDeck);

module.exports = { deckRouter };
