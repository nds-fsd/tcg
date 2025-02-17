require('dotenv').config();
const { Router } = require('express');
const { getUsers, getCurrentUser, getUser } = require('../controllers/userController');
const { jwtMiddleware } = require('../security/jwt.js');
const rolePath = process.env.ROLE_PATH;
const userRouter = Router();

userRouter.get('/', getUsers);
// userRouter.get('/:id', getUser);
// ID del usuario corresponde al token o admin
userRouter.get('/me', jwtMiddleware, getCurrentUser);

module.exports = { userRouter };
