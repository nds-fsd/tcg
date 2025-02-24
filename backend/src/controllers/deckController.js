const { Deck } = require('../data/Schema/deck');
const { User } = require('../data/Schema/user');
const { Card } = require('../data/Schema/card');

const getDecksUser = async (req, res) => {
  const userId = req.jwtPayload.id;
  try {
    const decks = await Deck.find({ owner: userId }).populate('owner').populate('cards.card').populate('fusionCards.card');

    res.status(200).json(decks);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los mazos' });
  }
};

const getDeckById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'ID del mazo no proporcionado' });
    }
    
    const deck = await Deck.findById(id).populate('owner').populate('cards.card').populate('fusionCards.card');

    if (!deck) {
      return res.status(404).json({ error: 'No se ha podido encontrar el mazo' });
    }

    res.status(200).json(deck);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el mazo' });
  }
};

const createDeck = async (req, res) => {
  try {
    const userId = req.jwtPayload?.id;
    
    if (!userId) {
      return res.status(401).json({ error: 'Usuario no autenticado o token inválido' });
    }

    const { deckTitle, cards = [], fusionCards = [] } = req.body;

    if (!deckTitle || deckTitle.trim() === '') {
      return res.status(400).json({ error: 'El título del mazo es obligatorio' });
    }

    const userDecks = await Deck.countDocuments({ owner: userId });
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (!user.admin && userDecks >= 5) {
      return res.status(400).json({ error: 'Límite de mazos alcanzado (5).' });
    }

    const totalNormalCards = cards.reduce((sum, card) => sum + (card.amount || 0), 0);
    const totalFusionCards = fusionCards.reduce((sum, card) => sum + (card.amount || 0), 0);

    if (totalNormalCards > 40) {
      return res.status(400).json({ error: 'No puedes añadir más de 40 cartas de monstruo y apoyo al mazo.' });
    }

    if (totalFusionCards > 10) {
      return res.status(400).json({ error: 'No puedes añadir más de 10 cartas de fusión al mazo.' });
    }

    const allCardIds = [...cards.map(c => c.card), ...fusionCards.map(c => c.card)];
    const existingCards = await Card.find({ _id: { $in: allCardIds } });

    if (existingCards.length !== allCardIds.length) {
      return res.status(400).json({ error: 'Algunas cartas no existen en la base de datos.' });
    }

    const formattedCards = cards.map((c) => ({
      card: new mongoose.Types.ObjectId(c.card),
      amount: c.amount,
    }));

    const formattedFusionCards = fusionCards.map((c) => ({
      card: new mongoose.Types.ObjectId(c.card),
      amount: c.amount,
    }));
    
    const newDeck = new Deck({
      deckTitle: deckTitle.trim(),
      owner: userId,
      cards: formattedCards,
      fusionCards: formattedFusionCards,
    });

    await newDeck.save();

    const deckToReturn = await Deck.findById(newDeck._id)
      .populate('owner')
      .populate('cards.card')
      .populate('fusionCards.card');

    res.status(201).json(deckToReturn);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear un mazo' });
  }
};

const updateDeck = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("📌 Recibida petición para actualizar el mazo con ID:", id);
    console.log("📌 Datos recibidos en el backend:", JSON.stringify(req.body, null, 2));

    const { deckTitle, cards, fusionCards } = req.body;

    if (!deckTitle || deckTitle.trim() === '') {
      return res.status(400).json({ error: 'El título del mazo es obligatorio' });
    }

    const totalNormalCards = cards.reduce((sum, card) => sum + (card.amount || 0), 0);
    const totalFusionCards = fusionCards.reduce((sum, card) => sum + (card.amount || 0), 0);

    if (totalNormalCards > 40) {
      return res.status(400).json({ error: 'No puedes añadir más de 40 cartas de monstruo y apoyo al mazo' });
    }

    if (totalFusionCards > 10) {
      return res.status(400).json({ error: 'No puedes añadir más de 10 cartas de fusión al mazo' });
    }

    const updatedDeck = await Deck.findByIdAndUpdate(
      id,
      { deckTitle: deckTitle.trim(), cards, fusionCards },
      { new: true, runValidators: true },
    )
      .populate('owner')
      .populate('cards.card')
      .populate('fusionCards.card');

    if (!updatedDeck) {
      return res.status(404).json({ error: 'No se ha podido encontrar el mazo' });
    }
    console.log("✅ Mazo actualizado correctamente en el backend:", updatedDeck);
    res.status(200).json(updatedDeck);
  } catch (error) {
    console.error("❌ Error en la actualización del mazo:", error);
    res.status(400).json([{ error: 'Error al actualizar el mazo' }]);
  }
};

const deleteDeck = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedDeck = await Deck.findByIdAndDelete(id);

    if (!deletedDeck) {
      return res.status(404).json({ error: 'No se ha podido encontrar el mazo' });
    }

    res.status(200).json({ message: 'Mazo eliminado con éxito' });
  } catch (error) {
    res.status(400).json([{ error: 'Error al eliminar el mazo' }]);
  }
};

module.exports = {
  getDecksUser,
  getDeckById,
  createDeck,
  updateDeck,
  deleteDeck,
};
