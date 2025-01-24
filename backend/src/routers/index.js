const { Router } = require('express');
const { cardRouter } = require('./cardRouter.js');
const { userRouter } = require('./userRouter.js');
const { userCollectionRouter } = require('./userCollectionRouter.js');

const router = Router();

router.use('/card', cardRouter);

router.use('/user', userRouter);
router.use('/userCollection', userCollectionRouter);

module.exports = router;
