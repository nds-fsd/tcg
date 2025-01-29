const { User } = require('../data/Schema/user');

const registerFunction = async (req, res) => {
  try {
    const { email, userName, password } = req.body;
    const data = req.body;

    if (!email || !userName || !password) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: { email: 'Email ya está en uso.' } });
    }

    const newUser = new User({ userName, email, password });
    const createdUser = await newUser.save();
    // Aqui se va pal secret en shema user y sale correctamente
    const token = createdUser.generateJWT();

    return res.status(201).json({
      token,
      user: {
        userName: createdUser.userName,
        level: createdUser.level,
        role: createdUser.role,
      },
    });
  } catch (e) {
    console.error('Error al registrar:', e);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

const loginFunction = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ error: { login: 'Falta el email o la contraseña' } });

  User.findOne({ email }).then((foundUser) => {
    if (!foundUser)
      return res
        .status(400)
        .json({ error: { email: 'Usuario no encontrado, porfavor Registrate antes de iniciar sesión' } });
    if (!foundUser.comparePassword(password))
      return res.status(400).json({ error: { password: 'Contraseña incorrecta' } });
    return res.status(200).json({
      token: foundUser.generateJWT(),
      user: {
        userName: foundUser.userName,
        level: foundUser.level,
        role: foundUser.role,
      },
    });
  });
};

module.exports = {
  registerFunction,
  loginFunction,
};
