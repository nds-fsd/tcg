const { Router } = require('express');
// const { cardRouter } = require('./cardRouter.js');
const { userRouter } = require('./userRouter.js');
// const { userCollectionRouter } = require('./userCollectionRouter.js');
const { authRouter } = require('./auth');
const { adminRouter } = require('./adminRouter');
// const { addDateMiddleware, validatePassword, validateEmail, validateUser } = require('../middlewares');
// const { jwtMiddleware } = require('../security/jwt.js');

const router = Router();

// router.use('/card', cardRouter);
router.use('/user', userRouter);
// router.use('/userCollection', userCollectionRouter);
// router.use('/deck', deckRouter);
router.use('/auth', authRouter);
router.use('/admin', adminRouter);

module.exports = router;