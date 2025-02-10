const { Router } = require('express');
const {
    createUser,
    deleteUser
} = require('../controllers/userController');
const { jwtMiddleware } = require('../security/jwt.js');

const adminRouter = Router();

adminRouter.post('/create', createUser);
adminRouter.delete('/delete/:id', deleteUser);

module.exports = { adminRouter };