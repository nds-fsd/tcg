const express = require('express');
const cardRouter = require ("./card.js")

const router = express.Router();

router.use('/card', cardRouter);

module.exports = router;
