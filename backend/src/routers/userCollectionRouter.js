require('dotenv').config();
const { Router } = require('express');
const {
    getUserCollection,
    createCardForUser,
    cardForUserDeleteById,
} = require('../controllers/userCollectionController');
const { jwtMiddleware } = require('../security/jwt.js');
const rolePath = process.env.ROLE_PATH;
const userCollectionRouter = Router();

// PASAR LES DADES DE QUI ES EL USAER QUE DEMANE LA SEVA COLLECIÓ HA TRAES DEL TOKEN
// Planteja que aquestes siguin privades ( Angel )
userCollectionRouter.get('/', jwtMiddleware, getUserCollection);
// userCollectionRouter.get(`/:id`, getUserCollectionById);
// UID updateCardById
// DID deleteCardById
userCollectionRouter.put(`/si`, createCardForUser);
// PROTEGER para saber si es admin
// userCollectionRouter.get(`/${rolePath}/:id`, jwtMiddleware, adminGetUserCollection);
// userCollectionRouter.put(`/${rolePath}/card/:cardId`, jwtMiddleware, adminCreateCardForUser);
// userCollectionRouter.delete(`/${rolePath}/card/:cardId`, jwtMiddleware, adminDeleteCardForUser);

module.exports = { userCollectionRouter };