const { UserCollection } = require('../data/Schema/userCollection');
const { Card } = require('../data/Schema/card');

const getUserCollection = async (req, res) => {
  try {
    const userId = req.jwtPayload.id;

    const userCollection = await UserCollection.findOne({ userId }).populate('userId').populate('cards.cardId');
    if (!userCollection) {
      return res.status(404).json({ e: 'Colección no encontrada para el usuario' });
    }
    res.status(200).json(userCollection);
  } catch (e) {
    res.status(500).json([{ e: 'Error en la recoleccion de Cartas del usuario' }]);
  }
};

const cardsObtainedFromChests = async (req, res) => {
  try {
    const { userId, chest } = req.body;

    const allCards = await Card.find();

    const chestCards = allCards.filter((card) => card.expansion === chest);

    const chestData = {
      common: chestCards.filter((card) => card.rarity === 'Común'),
      rare: chestCards.filter((card) => card.rarity === 'Rara'),
      epic: chestCards.filter((card) => card.rarity === 'Épica'),
      legendary: chestCards.filter((card) => card.rarity === 'Legendaria'),
    };

    const getRandomCard = (cardList) => {
      if (cardList.length === 0) return null;
      const selectedCard = cardList[Math.floor(Math.random() * cardList.length)];
      return selectedCard._id;
    };

    let selectedCards = [];

    for (let i = 0; i < 3; i++) {
      selectedCards.push({ cardId: getRandomCard(chestData.common), rarity: 'common' });
    }

    for (let i = 0; i < 2; i++) {
      let rarity = Math.random() < 0.1 ? 'epic' : 'rare';
      selectedCards.push({ cardId: getRandomCard(chestData[rarity]), rarity });
    }

    let finalRarity = Math.random() < 0.02 ? 'legendary' : 'epic';
    selectedCards.push({ cardId: getRandomCard(chestData[finalRarity]), rarity: finalRarity });

    selectedCards = selectedCards.filter((card) => card.cardId !== null);

    let userCollection = await UserCollection.findOne({ userId });
    if (!userCollection) {
      userCollection = new UserCollection({ userId, cards: [] });
    }

    selectedCards.forEach(({ cardId }) => {
      const existingCard = userCollection.cards.find((card) => card.cardId.toString() === cardId);
      if (existingCard) {
        existingCard.amount += 1;
      } else {
        userCollection.cards.push({ cardId, amount: 1 });
      }
    });

    await userCollection.save();
    res.status(201).json(userCollection);
  } catch (e) {
    res.status(500).json({ error: 'Error al agregar cartas al usuario' });
  }
};

const cardForUserDeleteById = async (req, res) => {
  const { userId, cardId } = req.params;

  try {
    const userCollection = await UserCollection.findOneAndUpdate(
      { userId },
      { $pull: { cards: { cardId } } },
      { new: true },
    );

    if (!userCollection) {
      return res.status(404).json({ e: 'No se encontró la carta en la colección del usuario' });
    }

    res.status(200).json({ message: 'Carta eliminada de la colección', userCollection });
  } catch (e) {
    res.status(400).json([{ e: 'Error al eliminar la carta del usuario' }]);
  }
};

module.exports = {
  getUserCollection,
  cardsObtainedFromChests,
  cardForUserDeleteById,
};
