const { Router } = require('express');
const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/storeProductController');
const { jwtMiddleware } = require('../security/jwt');

const storeRouter = Router();

storeRouter.get('/', getProducts);
storeRouter.post('/', createProduct);
storeRouter.put('/:id', updateProduct);
storeRouter.delete('/:id', deleteProduct);

module.exports = { storeRouter };