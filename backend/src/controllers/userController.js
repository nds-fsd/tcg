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

// const getUser = async (req, res) => {
//   try {
//     const User = await User.findById(req.params.id);
//     res.status(200).json(User);
//   } catch (error) {
//     res.status(500).json([{ Error: 'Error al cargar al Usuario' }]);
//   }
// };

// const updateUserById = async (req, res) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!updatedUser) {
//       return res.status(404).json({ error: 'Usuario no encontrado' });
//     }
//     res.status(200).json(updatedUser);
//   } catch (error) {
//     res.status(400).json([{ Error: 'Error al interntar modificar al usuario' }]);
//   }
// };

const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID de usuario inválido' });
    }

    const { admin } = req.jwtPayload;

    if (admin !== true) {
        return res.status(403).json({ error: 'Permiso denegado. Sólo los administradores pueden eliminar usuarios.' });
    }

    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(200).json({ message: 'Usuario eliminado', deletedUser });
    } catch (e) {
        res.status(400).json([{ Error: 'Error en la eliminación del usuario' }]);
    }
};

const createUser = async (req, res) => {
    const body = req.body;
    const { admin } = req.jwtPayload;

    if (admin !== true) {
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

    try {
        await newUser.save();
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json([{ Error: 'Error en la creación del usuario' }]);
    }
};

module.exports = {
    getUsers,
    getCurrentUser,
    //   getUser,
    //   updateUserById,
    createUser,
    deleteUser,
};
