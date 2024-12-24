const { Router } = require('express');
const {
  getAttributes,
  createAttribute,
  updateAttributeById,
  deleteAttributeById,
} = require('../controllers/attributeController');

const attributeRouter = Router();

attributeRouter.get('/', getAttributes);
attributeRouter.post('/', createAttribute);
attributeRouter.put('/:id', updateAttributeById);
attributeRouter.delete('/:id', deleteAttributeById);

module.exports = { attributeRouter };
