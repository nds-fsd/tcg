const { User } = require('../data/schemas/user');

const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json([{ error: error.message }, { "Error manual": "Error al cargar la lista de Usuarios" }]);
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const userFound = await User.findById(id);

    if (!userFound) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(userFound);
  } catch (error) {
    res.status(400).json([{ error: error.message }, { "Error manual": "Error al cargar el Usuario especificado" }]);
  }
};

const createUser = async (req, res) => {
  try {
    const { userName, email, password, birthDate } = req.body;
    const newUser = new User({
      userName,
      email,
      password,
      birthDate,
    });
    const savedUser = await newUser.save();
    const id = savedUser._id;

    const userToReturn = await User.findById(id);

    res.status(201).json(userToReturn);
  } catch (error) {
    res.status(400).json([{ error: error.message }, { "Error manual": "Error al crear usuario" }]);
  }
};

const updateUserById = async (req, res) => {
  try {
    const { userName, email, password, roles, profilePicture } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { userName, email, password, roles, profilePicture },
      { new: true, runValidators: true },
    );
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json([{ error: error.message }, { "Error manual": "Error en la modificacion del usuario" }]);
  }
};

const userDeleteById = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json([{ error: error.message }, { "Error manual": "Error en la eliminación del usuario del Usuario" }]);
  }
};

module.exports = {
  getUser,
  getUserById,
  createUser,
  updateUserById,
  userDeleteById,
};
