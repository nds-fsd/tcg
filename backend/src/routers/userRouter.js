require('dotenv').config();
const { Router } = require('express');
const {
    getUsers,
    getCurrentUser,
    getUser,
    updateUserById,
    userDeleteById,
    createUser,
    delteAllUsers
} = require('../controllers/userController');
const { jwtMiddleware } = require('../security/jwt.js');
const rolePath = process.env.ROLE_PATH;
const userRouter = Router();

// SIN PROTEGER 
// userRouter.get('/', getUsers);
// userRouter.get('/:id', getUser);
// ID del usuario corresponde al token o admin
userRouter.get('/me', jwtMiddleware, getCurrentUser);
// userRouter.put('/:id', jwtMiddlewareParaSaberSiTokenOAdmin, updateUserById);
// userRouter.delete('/:id', jwtMiddlewareParaSaberSiTokenOAdmin, userDeleteById);

// PROTEGER para saber si es admin
userRouter.post(`/${rolePath}/create`, createUser);

module.exports = { userRouter };