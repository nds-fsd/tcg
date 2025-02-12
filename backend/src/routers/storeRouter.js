const { Router } = require('express');
const { getProducts, createProduct, updateProduct, buyChest, buyCurrency, deleteProduct } = require('../controllers/storeProductController');
const { jwtMiddleware } = require('../security/jwt');

const storeRouter = Router();

storeRouter.get('/products', getProducts);
storeRouter.post('/products', jwtMiddleware, createProduct);
storeRouter.post('/products/:productId/buy-chest', jwtMiddleware, buyChest);
storeRouter.post('/products/:productId/buy-currency', jwtMiddleware, buyCurrency);
storeRouter.put('/products/:id', jwtMiddleware, updateProduct);
storeRouter.delete('/products/:id', jwtMiddleware, deleteProduct);

module.exports = { storeRouter };