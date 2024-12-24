const { Router } = require('express');
const { getCards, getCardById, createCard, updateCardById, deleteCardById } = require('../controllers/cardController');

const cardRouter = Router();

cardRouter.get('/', getCards);
cardRouter.get('/:id', getCardById);
cardRouter.post('/', createCard);
cardRouter.put('/:id', updateCardById);
cardRouter.delete('/:id', deleteCardById);

module.exports = { cardRouter };
