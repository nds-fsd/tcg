require('dotenv').config();
const { Router } = require('express');
const { getUserCollection } = require('../controllers/userCollectionController');
const { jwtMiddleware } = require('../security/jwt.js');
const userCollectionRouter = Router();

userCollectionRouter.get('/', jwtMiddleware, getUserCollection);
// userCollectionRouter.get(`/:id`, getUserCollectionById);
// UID updateCardById
// DID deleteCardById

module.exports = { userCollectionRouter };
