const { Router } = require('express');

const { cardRouter } = require('./cardRouter.js');
const { userRouter } = require('./userRouter.js');
const { userCollectionRouter } = require('./userCollectionRouter.js');
const { authRouter } = require('./auth');
const { addDateMiddleware, validatePassword, validateEmail, validateUser } = require('../middlewares');
const { jwtMiddleware } = require('../security/jwt.js');

const router = Router();

router.use('/card', cardRouter);
router.use('/user', jwtMiddleware, userRouter);
router.use('/userCollection', userCollectionRouter);
router.use('/auth', authRouter);

module.exports = router;
