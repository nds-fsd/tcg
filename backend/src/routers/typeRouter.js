const { Router } = require('express');
const { getTypes, createType, updateTypeById, deleteType } = require('../controllers/typeController');

const typeRouter = Router();

typeRouter.get('/', getTypes);
typeRouter.post('/', createType);
typeRouter.put('/:id', updateTypeById);
typeRouter.delete('/:id', deleteType);

module.exports = { typeRouter };
