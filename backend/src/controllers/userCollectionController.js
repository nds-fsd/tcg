const { userCollections } = require('../data/test/userCollectionTest');

const getUserCollection = async (req, res) => {
  try {
    const userC = await Card.find().populate('attribute').populate('type');
    res.json(userCollections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUserCollection = (req, res) => {
  id++;

  const newUserCollection = {
    id: id,
    userId: req.body.userId,
    cardId: req.body.cardId,
  };

  userCollections.push(newUserCollection);
  res.status(201).json(userCollections);
};

const userCollectionDelete = (req, res) => {
  const idToDelete = Number(req.params.id);
  const existingUserCollection = userCollections.find((userCollection) => userCollection.id === idToDelete);

  if (!existingUserCollection) {
    return res.status(404).json({
      error: 'Item not found',
    });
  }

  const existingUserCollectionIndex = userCollections.findIndex((userCollection) => userCollection.id === idToDelete);
  userCollections.splice(existingUserCollectionIndex, 1);

  res.json({
    status: 'success',
  });
};

module.exports = {
  getUserCollection,
  createUserCollection,
  userCollectionDelete,
};
