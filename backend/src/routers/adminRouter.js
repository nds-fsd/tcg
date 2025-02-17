const { Router } = require('express');
const { createUser, deleteUser, updateUser } = require('../controllers/userController');

const adminRouter = Router();

adminRouter.post('/create', createUser);
adminRouter.put('/update/:id', updateUser);
adminRouter.delete('/delete/:id', deleteUser);

module.exports = { adminRouter };
