const { Router } = require('express');
const {
  getUserCollection,
  createCardForUser,
  cardForUserDeleteById,
} = require('../controllers/userCollectionController');
const { jwtMiddleware } = require('../security/jwt.js');

const userCollectionRouter = Router();

userCollectionRouter.get('/', jwtMiddleware, getUserCollection);
userCollectionRouter.post('/', createCardForUser);
userCollectionRouter.delete('/:userId/cards/:cardId', cardForUserDeleteById);

module.exports = { userCollectionRouter };