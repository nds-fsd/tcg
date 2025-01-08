const { Router } = require('express');
const { getDecksUser, createDeck, updateDeck, deleteDeck } = require('../controllers/deckController');

const deckRouter = Router();

deckRouter.get('/:id', getDecksUser);
deckRouter.get('/', createDeck);
deckRouter.post('/:id', updateDeck);
deckRouter.put('/:id', deleteDeck);

module.exports = { deckRouter };