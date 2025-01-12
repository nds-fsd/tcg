const { User } = require('../data/Schema/user');

const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json([{ error: error.message }, { 'Error manual': 'Error al cargar la lista de Usuarios' }]);
  }
};

const createUser = async (req, res) => {
  try {
    const { userName, email, password, img, level, birthDate, isActive, roles } = req.body;
    const newUser = new User({
      userName,
      email,
      password,
      img,
      level,
      birthDate,
      isActive,
      roles,
    });
    const savedUser = await newUser.save();
    const id = savedUser._id;

    const userToReturn = await User.findById(id);

    res.status(201).json(userToReturn);
  } catch (error) {
    res.status(400).json([{ error: error.message }, { 'Error manual': 'Error al crear usuario' }]);
  }
};

const updateUserById = async (req, res) => {
  try {
    const { userName, email, password, img, roles, level } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { userName, email, password, img, roles, level },
      { new: true, runValidators: true },
    );
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json([{ error: error.message }, { 'Error manual': 'Error en la modificacion del usuario' }]);
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
    res
      .status(400)
      .json([{ error: error.message }, { 'Error manual': 'Error en la eliminación del usuario del Usuario' }]);
  }
};

module.exports = {
  getUser,
  createUser,
  updateUserById,
  userDeleteById,
};
