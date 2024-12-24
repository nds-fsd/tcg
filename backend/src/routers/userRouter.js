const { Router } = require('express');
const { getUser, getUserById, createUser, updateUserById, userDeleteById } = require('../controllers/userController');

const userRouter = Router();

userRouter.get('/', getUser);
userRouter.get('/:id', getUserById);
userRouter.post('/', createUser);
userRouter.put('/:id', updateUserById);
userRouter.delete('/:id', userDeleteById);

module.exports = { userRouter };
