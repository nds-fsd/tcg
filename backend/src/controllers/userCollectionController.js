const { userCollections } = require('../data/test/userCollectionTest');

let id = Math.max(...userCollections.map(userCollection => userCollection.id || 0));

const getUserCollection = (req, res) => { res.json(userCollections) };

const addUserCollection = (req, res) => {
    id++;

    const newUserCollection = {
        id: id,
        userId: req.body.userId,
        cardId: req.body.cardId
    }

    userCollections.push(newUserCollection);
    res.status(201).json(userCollections);
};

const updateUserCollectionById = (req, res) => { };

const userCollectionDelete = (req, res) => {
    const idToDelete = Number(req.params.id);
    const existingUserCollection = userCollections.find((userCollection) => userCollection.id === idToDelete)

    if (!existingUserCollection) {
        return res.status(404).json({
            error: 'Item not found'
        })
    }

    const existingUserCollectionIndex = userCollections.findIndex((userCollection) => userCollection.id === idToDelete)
    userCollections.splice(existingUserCollectionIndex, 1)

    res.json({
        status: 'success'
    });

};

module.exports = {
    getUserCollection,
    addUserCollection,
    userCollectionDelete
};