const { Router } = require('express');
const { createType, getTypes, updateType, deleteType } = require('../controllers/type');

const typeRouter = Router();

typeRouter.get('/', getTypes);
typeRouter.post('/', createType);
typeRouter.put('/:id', updateType);
typeRouter.delete('/:id', deleteType);

module.exports = { typeRouter };