const { Deck } = require('../data/Schema/deck');

const getDecksUser = async (req, res) => {
  const id = req.params.id;
  try {
    const decks = await Deck.find({ owner: id }).populate('owner').populate('cards');
    res.status(200).json(decks);
  } catch (error) {
    res.status(500).json([{ error: error.message }, { 'Error manual': 'Error al obtener los decks' }]);
  }
};

const createDeck = async (req, res) => {
  try {
    const { name, owner } = req.body;
    const newDeck = new Deck({
      name,
      owner,
    });
    const savedDeck = await newDeck.save();
    const id = savedDeck._id;

    const deckToReturn = await Deck.findById(id).populate('owner').populate('cards');

    res.status(201).json(deckToReturn);
  } catch (error) {
    res.status(400).json([{ error: error.message }, { 'Error manual': 'Error al crear una carta' }]);
  }
};

const updateDeck = async (req, res) => {
  try {
    const { name, cards } = req.body;
    const updatedDeck = await Deck.findByIdAndUpdate(
      req.params.id,
      { name, cards },
      { new: true, runValidators: true },
    );
    if (!updatedDeck) {
      return res.status(404).json({ error: 'Deck not found' });
    }
    res.status(200).json(updatedDeck);
  } catch (error) {
    res.status(400).json([{ error: error.message }, { 'Error manual': 'Error al actualizar el deck' }]);
  }
};

const deleteDeck = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedDeck = await Deck.findByIdAndDelete(id);
    if (!deletedDeck) {
      return res.status(404).json({ error: 'Card not found' });
    }
    res.status(200).json({ message: 'Card deleted successfully' });
  } catch (error) {
    res.status(400).json([{ error: error.message }, { 'Error manual': 'Error al eliminar del deck' }]);
  }
};

module.exports = {
  getDecksUser,
  createDeck,
  updateDeck,
  deleteDeck,
};
