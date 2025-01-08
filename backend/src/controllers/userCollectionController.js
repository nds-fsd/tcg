const { UserCollection } = require('../data/Schema/userCollection');

const getUserCollection = async (req, res) => {
  const id = req.params.id;

  try {
    const userCollections = await UserCollection.find({ userId: id }).populate('userId').populate('cardId');

    res.status(200).json(userCollections);
  } catch (error) {
    res.status(500).json([{ error: error.message }, { "Error manual": "Error en la recoleccion de la colección del usuario" }]);
  }
};

const createUserCollection = async (req, res) => {
  try {
    const { userId, cardId } = req.body;
    const newUserCardAssigned = new UserCollection({
      userId,
      cardId,
    });
    const savedNewUserCar = await newUserCardAssigned.save();
    const id = savedNewUserCar._id;

    const userCardToReturn = await UserCollection.findById(id);

    res.status(201).json(userCardToReturn);
  } catch (error) {
    res.status(400).json([{ error: error.message }, { "Error manual": "Error al crear las coleciones del usuario" }]);
  }
};

// update??

const userCollectionDeleteById = async (req, res) => {
  const { userId, cardId } = req.params;

  try {
    const deletedEntry = await UserCollection.findOneAndDelete({ user: userId, card: cardId });

    if (!deletedEntry) {
      return res.status(404).json({ error: 'No entry found for the specified user and card' });
    }

    res.status(200).json({ message: 'Entry deleted successfully' });
  } catch (error) {
    res.status(400).json([{ error: error.message }, { "Error manual": "Error en la eliminación de una de tus cartas" }]);
  }
};

module.exports = {
  getUserCollection,
  createUserCollection,
  userCollectionDeleteById,
};
