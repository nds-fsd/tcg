const { Router } = require('express');
const {
  getUserCollection,
  createUserCollection,
  userCollectionDelete,
} = require('../controllers/userCollectionController');

const userCollectionRouter = Router();

userCollectionRouter.get('/', getUserCollection);
userCollectionRouter.post('/', createUserCollection);
userCollectionRouter.delete('/:id', userCollectionDelete);

module.exports = { userCollectionRouter };
