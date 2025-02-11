const { User } = require('../data/Schema/user');

const getUsers = async (req, res) => {
  try {
    const queryStrings = req.query || {};
    const allUsers = await User.find(queryStrings);
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json([{ Error: 'Error al cargar la lista de Usuarios' }]);
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const userId = req.jwtPayload.id;
    const currentUser = await User.findById(userId);
    res.status(200).json(currentUser);
  } catch (error) {
    res.status(500).json([{ Error: 'Error al cargar al current Usuario' }]);
  }
};

const getUser = async (req, res) => {
  try {
    const User = await User.findById(req.params.id);
    res.status(200).json(User);
  } catch (error) {
    res.status(500).json([{ Error: 'Error al cargar al Usuario' }]);
  }
};

const updateUserById = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json([{ Error: 'Error al interntar modificar al usuario' }]);
  }
};

const userDeleteById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(400).json([{ Error: 'Error en la eliminación del usuario' }]);
  }
};

const createUser = async (req, res) => {
  const body = req.body;

  console.log(body);

  const data = {
    userName: body.userName,
    email: body.email,
    password: body.password,
  };

  const newUser = new User(data);

  try {
    console.log('Usuario guardado');
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json([{ Error: 'Error en la creación del usuario' }]);
  }
};

module.exports = {
  getUsers,
  getCurrentUser,
  getUser,
  updateUserById,
  userDeleteById,
  createUser,
};
