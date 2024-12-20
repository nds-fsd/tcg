const { Router } = require('express');
const {
  getAttributes,
  createAttribute,
  updateAttributeById,
  deleteAttribute,
} = require('../controllers/attributeController');

const attributeRouter = Router();

attributeRouter.get('/', getAttributes);
attributeRouter.post('/', createAttribute);
attributeRouter.put('/:id', updateAttributeById);
attributeRouter.delete('/:id', deleteAttribute);

module.exports = { attributeRouter };
