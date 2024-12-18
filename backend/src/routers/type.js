const { Router } = require('express');
const { createType, getTypes } = require('../controllers/type');

const typeRouter = Router();

router.get('/', getTypes);
router.post('/', createType);

module.exports = { typeRouter };