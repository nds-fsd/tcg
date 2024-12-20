const { UserCollection } = require('../data/schemas/userCollection');

const getUserCollection = async (req, res) => {
  const id = req.params.id;

  try {
    const userCollections = await UserCollection.find({ userId: id }).populate('user').populate('card');

    res.status(200).json(userCollections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUserCollection = async (req, res) => {
  try {
    const { userId, cardId } = req.body;
    const newUserCardAssigned = new UserCollection({
      userId,
      cardId,
      password,
      birthDate,
    });
    const savedNewUserCar = await newUserCardAssigned.save();
    const id = savedNewUserCar._id;

    const userCardToReturn = await UserCollection.findById(id);

    res.status(201).json(userCardToReturn);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
    res.status(400).json({ error: 'Invalid request or ID format' });
  }
};

module.exports = {
  getUserCollection,
  createUserCollection,
  userCollectionDeleteById,
};
