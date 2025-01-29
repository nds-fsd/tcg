const { Router } = require('express');
const { loginFunction, registerFunction } = require('../controllers/authController');

const authRouter = Router();

authRouter.post('/login', loginFunction);
authRouter.post('/register', registerFunction);

module.exports = {
  authRouter,
};
