const { Card } = require('../data/schemas/card');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find().populate('attribute').populate('type');
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json([{ error: error.message }, { "Error manual": "Error al obtener cartas" }]);
  }
};
//   try {
//     const { page = 1, limit = 10, rarity, type, attribute } = req.query;

//     const filters = {};
//     if (rarity) filters.rarity = rarity;
//     if (type) filters.type = type;
//     if (attribute) filters.attribute = attribute;

//     const cards = await Card.find(filters)
//       .skip((page - 1) * limit)
//       .limit(Number(limit));

//     const totalCards = await Card.countDocuments(filters);

//     res.status(200).json({
//       data: cards,
//       total: totalCards,
//       page: Number(page),
//       totalPages: Math.ceil(totalCards / limit),
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const getCardById = async (req, res) => {
  const id = req.params.id;

  try {
    const cardFound = await Card.findById(id).populate('attribute').populate('type');

    if (!cardFound) {
      return res.status(404).json({ error: 'Card not found' });
    }

    return res.status(200).json(cardFound);
  } catch (error) {
    res.status(400).json([{ error: error.message }, { "Error manual": "Error al encontrar cartas" }]);
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
    res.status(400).json([{ error: error.message }, { "Error manual": "Error al crear una carta" }]);
  }
};

const updateCardById = async (req, res) => {
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
    res.status(400).json([{ error: error.message }, { "Error manual": "Error al actualizar la carta" }]);
  }
};

const deleteCardById = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedCard = await Card.findByIdAndDelete(id);
    if (!deletedCard) {
      return res.status(404).json({ error: 'Card not found' });
    }
    res.status(200).json({ message: 'Card deleted successfully' });
  } catch (error) {
    res.status(400).json([{ error: error.message }, { "Error manual": "Error al eliminar la carta" }]);
  }
};

module.exports = {
  getCards,
  createCard,
  getCardById,
  updateCardById,
  deleteCardById,
};
