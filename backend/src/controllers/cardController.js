const { Card } = require('../data/Schema/card');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find().populate('attribute').populate('type');
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCard = async (req, res) => {
  try {
    const { name, image, attribute, type, description, rarity } = req.body;
    const newCard = new Card({
      name,
      image,
      attribute,
      type,
      description,
      rarity,
    });
    const savedCard = await newCard.save();
    const id = savedCard._id;

    const cardToReturn = await Card.findById(id).populate('attribute').populate('type');

    res.status(201).json(cardToReturn);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCardById = async (req, res) => {
  try {
    const id = req.params.id;
    const cardFound = await Card.findById(id).populate('attribute').populate('type');
    if (!cardFound) {
      return res.status(404).json({ error: 'Card not found' });
    }
    return res.status(200).json(cardFound);
  } catch (error) {
    res.status(400).json({ error: 'Invalid ID format' });
  }
};

const updateCard = async (req, res) => {
  try {
    const { name, image, attribute, type, description, rarity } = req.body;
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.id,
      { name, image, attribute, type, description, rarity },
      { new: true, runValidators: true },
    );
    if (!updatedCard) {
      return res.status(404).json({ error: 'Card not found' });
    }
    res.status(200).json(updatedCard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCard = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedCard = await Card.findByIdAndDelete(id);
    if (!deletedCard) {
      return res.status(404).json({ error: 'Card not found' });
    }
    res.status(200).json({ message: 'Card deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid ID format' });
  }
};

module.exports = {
  getCards,
  createCard,
  getCardById,
  updateCard,
  deleteCard,
};
