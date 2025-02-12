require('dotenv').config();
const { Router } = require('express');
const {
    getUserCollection,
} = require('../controllers/userCollectionController');
const { jwtMiddleware } = require('../security/jwt.js');
const userCollectionRouter = Router();

// PASAR LES DADES DE QUI ES EL USAER QUE DEMANE LA SEVA COLLECIÓ HA TRAES DEL TOKEN
// Planteja que aquestes siguin privades ( Angel )
userCollectionRouter.get('/', jwtMiddleware, getUserCollection);

module.exports = { userCollectionRouter };
