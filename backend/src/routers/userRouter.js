const { Router } = require('express');
const { getUser, createUser, updateUserById, userDeleteById } = require('../controllers/userController');

const userRouter = Router();

userRouter.get('/', getUser);
userRouter.post('/', createUser);
userRouter.put('/:id', updateUserById);
userRouter.delete('/:id', userDeleteById);

module.exports = { userRouter };
