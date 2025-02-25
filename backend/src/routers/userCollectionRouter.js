require('dotenv').config();
const { Router } = require('express');
const { getUserCollection, cardsObtainedFromChests } = require('../controllers/userCollectionController');
const { jwtMiddleware } = require('../security/jwt.js');
const userCollectionRouter = Router();

userCollectionRouter.get('/', jwtMiddleware, getUserCollection);
// userCollectionRouter.get(`/:id`, getUserCollectionById);
// UID updateCardById
// DID deleteCardById
// userCollectionRouter.put('/cardsObtainer', cardsObtainedFromChests);

module.exports = { userCollectionRouter };
