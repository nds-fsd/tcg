const { Router } = require('express');
const { getMarketPlace } = require('../controllers/marketController');
const marketRouter = Router();

marketRouter.get('/', getMarketPlace);

module.exports = { marketRouter };
