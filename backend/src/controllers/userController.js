const { default: mongoose } = require('mongoose');
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
    if (!currentUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(currentUser);
  } catch (error) {
    res.status(500).json([{ Error: 'Error al obtener el usuario actual' }]);
  }
};

const updateUser = async (req, res) => {
  const userId = req.jwtPayload.id;
  const updateInfo = req.body.userUpdate;

  try {
    const requestingUser = await User.findById(req.jwtPayload.id);
    if (!requestingUser) {
      return res.status(401).send();
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateInfo, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).send();
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID de usuario inválido' });
  }

  try {
    const requestingUser = await User.findById(req.jwtPayload.id);
    if (!requestingUser) {
      return res.status(404).json({ error: 'Usuario que realiza la solicitud no encontrado' });
    }

    if (!requestingUser.admin) {
      return res.status(403).json({ error: 'Permiso denegado. Sólo los administradores pueden eliminar usuarios.' });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (e) {
    res.status(400).json([{ Error: 'Error en la eliminación del usuario' }]);
  }
};

const createUser = async (req, res) => {
  const body = req.body;

  try {
    const requestingUser = await User.findById(req.jwtPayload.id);
    if (!requestingUser) {
      return res.status(404).json({ error: 'Usuario que realiza la solicitud no encontrado' });
    }

    if (!requestingUser.admin) {
      return res.status(403).json({ error: 'Permiso denegado. Sólo los administradores pueden eliminar usuarios.' });
    }

    const data = {
      userName: body.newUser.userName,
      email: body.newUser.email,
      password: body.newUser.password,
      level: body.newUser.level,
      admin: body.newUser.admin,
    };

    const newUser = new User(data);

    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json([{ Error: 'Error en la creación del usuario' }]);
  }
};

module.exports = {
  getUsers,
  getCurrentUser,
  updateUser,
  createUser,
  deleteUser,
};
