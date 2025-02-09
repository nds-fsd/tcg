const { User } = require('../data/Schema/user');

// const getUsers = async (req, res) => {
//   try {
//     const queryStrings = req.query || {};
//     const allUsers = await User.find(queryStrings);
//     res.status(200).json(allUsers);
//   } catch (error) {
//     res.status(500).json([{ Error: 'Error al cargar la lista de Usuarios' }]);
//   }
// };

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
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json([{ Error: 'Error al cargar al usuario' }]);
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

// const userDeleteById = async (req, res) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.params.id);
//     if (!deletedUser) {
//       return res.status(404).json({ error: 'Usuario no encontrado' });
//     }
//     res.status(200).json({ message: 'Usuario eliminado' });
//   } catch (error) {
//     res.status(400).json([{ Error: 'Error en la eliminación del usuario' }]);
//   }
// };

const createUser = async (req, res) => {
    const body = req.body;

    const data = {
        userName: body.newUser.userName,
        email: body.newUser.email,
        password: body.newUser.password,
        level: body.newUser.level,
        admin: body.newUser.admin,
    };

    const newUser = new User(data);

    try {
        await newUser.save();
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json([{ Error: 'Error en la creación del usuario' }]);
    }
};

module.exports = {
    //   getUsers,
    getCurrentUser,
    //   getUser,
    //   updateUserById,
    //   userDeleteById,
    createUser,
};
