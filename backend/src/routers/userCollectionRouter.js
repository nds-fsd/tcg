const { Router } = require('express');
const {
  getUserCollection,
  createUserCollection,
  userCollectionDeleteById,
} = require('../controllers/userCollectionController');

const userCollectionRouter = Router();

userCollectionRouter.get('/:id', getUserCollection);
userCollectionRouter.post('/', createUserCollection);
userCollectionRouter.delete('/:userId/cards/:cardId', userCollectionDeleteById);

module.exports = { userCollectionRouter };
