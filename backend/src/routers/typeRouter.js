const { Router } = require('express');
const { getTypes, createType, updateType, deleteType } = require('../controllers/typeController');

const typeRouter = Router();

typeRouter.get('/', getTypes);
typeRouter.post('/', createType);
typeRouter.put('/:id', updateType);
typeRouter.delete('/:id', deleteType);

module.exports = { typeRouter };
