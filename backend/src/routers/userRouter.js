require('dotenv').config();
const { Router } = require('express');
const { getUsers, getCurrentUser, updateUser } = require('../controllers/userController');
const { jwtMiddleware } = require('../security/jwt.js');
const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/me', jwtMiddleware, getCurrentUser);
userRouter.put('/update', jwtMiddleware, updateUser);

module.exports = { userRouter };
