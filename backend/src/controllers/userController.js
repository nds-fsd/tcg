const { User } = require('../data/test/userTest');

const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = (req, res) => {
  const idToFind = Number(req.params.id);
  const existingUser = users.find((user) => user.id === idToFind);

  if (!existingUser) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(existingUser);
};

const createUser = (req, res) => {
  id++;

  const newUser = {
    id: id,
    nickName: req.body.nickName,
    email: req.body.email,
    password: req.body.password,
  };

  users.push(newUser);
  res.status(201).json(newUser);
};

const updateUserById = (req, res) => {
  const idToFind = Number(req.params.id);
  const existingUser = users.find((user) => user.id === idToFind);

  if (!existingUser) {
    return res.status(404).json({ error: 'User not found' });
  }

  const updateUser = {
    id: existingUser.id,
    nickName: req.body.nickName || existingUser.nickName,
    email: req.body.email || existingUser.email,
    password: req.body.password || existingUser.password,
    level: req.body.level || existingUser.level,
    birthDate: req.body.birthDate || existingUser.birthDate,
    roles: req.body.roles || existingUser.roles,
    profilePicture: req.body.profilePicture || existingUser.profilePicture,
  };

  const existingUserIndex = users.findIndex((user) => user.id === idToFind);
  todos.splice(existingUserIndex, 1, updateUser);

  res.json(updateUser);
};

const userDelete = (req, res) => {
  const idToDelete = Number(req.params.id);
  const existingUser = users.find((todos) => todos.id === idToDelete);

  if (!existingUser) {
    return res.status(404).json({
      error: 'Item not found',
    });
  }

  const existingUserIndex = users.findIndex((todos) => todos.id === idToDelete);
  users.splice(existingUserIndex, 1);

  res.json({
    status: 'success',
  });
};

module.exports = {
  getUser,
  getUserById,
  createUser,
  updateUserById,
  userDelete,
};
