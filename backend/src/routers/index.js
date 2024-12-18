const express = require('express');
const {cardRouter} = require ("./card.js")
const {attributeRouter} = require('./attribute');
const {typeRouter} = require('./type');

const router = express.Router();

router.use('/card', cardRouter);
router.use('/attributes', attributeRouter);
router.use('/types', typeRouter);

module.exports = router;