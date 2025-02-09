const { Router } = require('express');
const { getProducts, createProduct, updateProduct, buyChest, buyCurrency, deleteProduct } = require('../controllers/storeProductController');
const { jwtMiddleware } = require('../security/jwt');

const storeRouter = Router();

storeRouter.get('/', getProducts);
storeRouter.post('/', createProduct);
storeRouter.post('/buy/chest/:productId', jwtMiddleware, buyChest);
storeRouter.post('/buy/currency/:productId', jwtMiddleware, buyCurrency);
storeRouter.put('/:id', updateProduct);
storeRouter.delete('/:id', deleteProduct);

module.exports = { storeRouter };