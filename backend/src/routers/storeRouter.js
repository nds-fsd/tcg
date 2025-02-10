const { Router } = require('express');
const { getProducts, createProduct, updateProduct, buyChest, buyCurrency, deleteProduct } = require('../controllers/storeProductController');
const { jwtMiddleware } = require('../security/jwt');

const storeRouter = Router();

storeRouter.get('/', getProducts);
storeRouter.post('/', jwtMiddleware, createProduct);
storeRouter.post('/buy/chest/:id', jwtMiddleware, buyChest);
storeRouter.post('/buy/currency/:id', jwtMiddleware, buyCurrency);
storeRouter.put('/:id', jwtMiddleware, updateProduct);
storeRouter.delete('/:id', jwtMiddleware, deleteProduct);

module.exports = { storeRouter };