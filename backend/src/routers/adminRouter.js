const { Router } = require('express');
const {
    createUser,
    deleteUser
} = require('../controllers/userController');
const { jwtMiddleware } = require('../security/jwt.js');

const adminRouter = Router();

<<<<<<< HEAD
adminRouter.post('/create', jwtMiddleware, createUser);
adminRouter.delete('/delete/:id', jwtMiddleware, deleteUser);
=======
adminRouter.post('/create', createUser);
adminRouter.delete('/delete/:id', deleteUser);
>>>>>>> e4a3b6c (Mejoras en registro, login, headers y usuarios)

module.exports = { adminRouter };