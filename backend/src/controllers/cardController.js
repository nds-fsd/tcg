const { Card } = require('../data/Schema/card');

const validAttributes = ['darkness', 'light', 'earth', 'fire', 'wind', 'water'];
const validTypes = ['zombie', 'beast', 'warrior', 'fairy', 'demon', 'plant'];

const validateCardData = ({ attribute, type }) => {
  if (!validAttributes.includes(attribute)) {
    throw new Error(`Invalid attribute: ${attribute}`);
  }
  if (!validTypes.includes(type)) {
    throw new Error(`Invalid type: ${type}`);
  }
};

const getCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards || []);
  } catch (error) {
    res.status(500).send();
  }
};

const createCard = async (req, res) => {
  try {
    validateCardData(req.body);

    const { jwtPayload } = req;

    const newCard = new Card({
      name,
      image,
      attribute,
      type,
      description,
      rarity,
      category,
      expansion,
      atk,
      def,
      effect,
      level,
    });
    const savedCard = await newCard.save();
    const id = savedCard._id;

    const cardToReturn = await Card.findById(id);

    res.status(201).json(cardToReturn);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCardById = async (req, res) => {
  try {
    const id = req.params.id;
    const cardFound = await Card.findById(id);
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
    validateCardData(req.body);

    const { jwtPayload } = req;

    const { name, image, attribute, type, description, rarity, category, expansion, atk, def, effect, level } =
      req.body;

    const updatedCard = await Card.findByIdAndUpdate(
      req.params.id,
      { name, image, attribute, type, description, rarity, category, expansion, atk, def, effect, level },
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
    const { jwtPayload } = req;

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
