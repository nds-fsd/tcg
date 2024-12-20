const { Router } = require('express');
const {
  getUserCollection,
  createUserCollection,
  userCollectionDelete,
} = require('../controllers/userCollectionController');

const userCollectionRouter = Router();

userCollectionRouter.get('/:id', getUserCollection);
userCollectionRouter.post('/', createUserCollection);
userCollectionRouter.delete('/:id/:id', userCollectionDelete);

module.exports = { userCollectionRouter };
