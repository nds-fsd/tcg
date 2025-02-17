const { Router } = require('express');
const { cardRouter } = require('./cardRouter.js');
const { userRouter } = require('./userRouter.js');
const { userCollectionRouter } = require('./userCollectionRouter.js');
const { storeRouter } = require('./storeRouter.js');
const { authRouter } = require('./auth');
const { adminRouter } = require('./adminRouter');
const { jwtMiddleware } = require('../security/jwt.js');

const router = Router();

router.use('/card', cardRouter);
router.use('/user', userRouter);
router.use('/userCollection', userCollectionRouter);
router.use('/store', storeRouter);
router.use('/auth', authRouter);
router.use('/admin', jwtMiddleware, adminRouter);

module.exports = router;
