const { Router } = require('express');
const {
  getUsers,
  getCurrentUser,
  getUser,
  updateUserById,
  userDeleteById,
  createUser,
} = require('../controllers/userController');
const { addDateMiddleware, validateUser } = require('../middlewares');

const userRouter = Router();

userRouter.get('/', addDateMiddleware, getUsers);
userRouter.get('/me', addDateMiddleware, getCurrentUser);
userRouter.get('/:id', addDateMiddleware, getUser);
userRouter.put('/:id', updateUserById);
userRouter.delete('/:id', userDeleteById);
userRouter.post('/', validateUser, createUser);

module.exports = { userRouter };
