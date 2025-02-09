// const mongoose = require('mongoose');
// const { UserCollection } = require('../data/Schema/userCollection');

const getUserCollection = async (req, res) => {
  try {
    const userId = req.jwtPayload.id;

    const userCollection = await UserCollection.findOne({ userId })
      .populate('userId')
      .populate('cards.cardId');
    if (!userCollection) {
      return res.status(404).json({ e: 'Colección no encontrada para el usuario' });
    }

    res.status(200).json(userCollection);
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json([{ e: 'Error en la recoleccion de Cartas del usuario' }]);
  }
};

// const createCardForUser = async (req, res) => {
//   try {
//     const { userId, cardId } = req.body;

//     let userCollection = await UserCollection.findOne({ userId });

//     if (!userCollection) {
//       userCollection = new UserCollection({
//         userId,
//         cards: [{ cardId, amount: 1 }],
//       });
//     } else {
//       const existingCard = userCollection.cards.find((card) => card.cardId.toString() === cardId);

//       if (existingCard) {
//         existingCard.amount += 1;
//       } else {
//         userCollection.cards.push({ cardId, amount: 1 });
//       }
//     }

//     await userCollection.save();
//     res.status(201).json(userCollection);
//   } catch (e) {
//     console.error(e);
//     res.status(400).json([{ e: 'Error al agregar la carta al usuario' }]);
//   }
// };

// const cardForUserDeleteById = async (req, res) => {
//   const { userId, cardId } = req.params;

//   try {
//     const userCollection = await UserCollection.findOneAndUpdate(
//       { userId },
//       { $pull: { cards: { cardId } } },
//       { new: true }
//     );

//     if (!userCollection) {
//       return res.status(404).json({ e: 'No se encontró la carta en la colección del usuario' });
//     }

//     res.status(200).json({ message: 'Carta eliminada de la colección', userCollection });
//   } catch (e) {
//     console.error(e);
//     res
//       .status(400)
//       .json([{ e: 'Error al eliminar la carta del usuario' }]);
//   }
// };

// module.exports = {
//   getUserCollection,
//   createCardForUser,
//   cardForUserDeleteById,
// };
