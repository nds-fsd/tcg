const { Router } = require('express');
const { createType, getTypes } = require('../controllers/type');

const typeRouter = Router();

typeRouter.get('/', getTypes);
typeRouter.post('/', createType);

module.exports = { typeRouter };