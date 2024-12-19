const {Router} = require('express');
const {cardRouter} = require ("./card.js")
const {attributeRouter} = require('./attribute.js');
const {typeRouter} = require('./type.js');

const router = Router();

router.use('/card', cardRouter);
router.use('/attributes', attributeRouter);
router.use('/types', typeRouter);

module.exports = router;