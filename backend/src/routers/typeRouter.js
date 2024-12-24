const { Router } = require('express');
const { getTypes, createType, updateTypeById, deleteTypeById } = require('../controllers/typeController');

const typeRouter = Router();

typeRouter.get('/', getTypes);
typeRouter.post('/', createType);
typeRouter.put('/:id', updateTypeById);
typeRouter.delete('/:id', deleteTypeById);

module.exports = { typeRouter };
