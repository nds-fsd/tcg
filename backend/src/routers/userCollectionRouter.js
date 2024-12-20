const { Router } = require('express');
const {
  getUserCollection,
  createUserCollection,
  userCollectionDeleteById,
} = require('../controllers/userCollectionController');

const userCollectionRouter = Router();

userCollectionRouter.get('/:id', getUserCollection);
userCollectionRouter.post('/', createUserCollection);
userCollectionRouter.delete('/:id/:id', userCollectionDeleteById);

module.exports = { userCollectionRouter };
