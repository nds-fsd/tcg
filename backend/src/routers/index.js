const { Router } = require('express');
const { cardRouter } = require('./card.js');
const { attributeRouter } = require('./attribute.js');
const { typeRouter } = require('./type.js');
const { userRouter } = require('./userRouter.js');
const { userCollectionRouter } = require('./userCollectionRouter.js');

const router = Router();

router.use('/card', cardRouter);
router.use('/attributes', attributeRouter);
router.use('/types', typeRouter);

router.use('/user', userRouter);
router.use('/userCollection', userCollectionRouter);

module.exports = router;
