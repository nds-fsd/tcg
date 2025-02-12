// const { Deck } = require('../data/Schema/deck');

const getDecksUser = async (req, res) => {
  const id = req.params.id;
  try {
    const decks = await Deck.find({ owner: id })
      .populate('owner')
      .populate('cards.card')
      .populate('fusionCards.card');

    res.status(200).json(decks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los mazos' });
  }
};

const getDeckById = async (req, res) => {
  try {
    const { id } = req.params;
    const deck = await Deck.findById(id)
      .populate('owner')
      .populate('cards.card')
      .populate('fusionCards.card');

    if (!deck) {
      return res.status(404).json({ error: 'No se ha podido encontrar el mazo' });
    }

    res.status(200).json(deck);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el mazo' });
  }
};

const createDeck = async (req, res) => {
  try {
    const { jwtPayload } = req;
    const { deckTitle, cards = [], fusionCards = [] } = req.body;

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

    const newDeck = new Deck({
      deckTitle,
      owner: jwtPayload.userId,
      cards,
      fusionCards,
    });
    
    const savedDeck = await newDeck.save();
    const id = savedDeck._id;

    const deckToReturn = await Deck.findById(id)
    .populate('owner')
    .populate('cards.card')
    .populate('fusionCards.card');

//     res.status(201).json(deckToReturn);
//   } catch (error) {
//     res.status(400).json([{ error: 'Error al crear un mazo' }]);
//   }
// };

const updateDeck = async (req, res) => {
  try {
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
      req.params.id,
      { deckTitle: deckTitle.trim(), cards, fusionCards },
      { new: true, runValidators: true },
    )
      .populate('owner')
      .populate('cards.card')
      .populate('fusionCards.card');

//     if (!updatedDeck) {
//       return res.status(404).json({ error: 'No se ha podido encontrar el mazo' });
//     }
//     res.status(200).json(updatedDeck);
//   } catch (error) {
//     res.status(400).json([{ error: 'Error al actualizar el mazo' }]);
//   }
// };

// const deleteDeck = async (req, res) => {
//   const id = req.params.id;

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

// module.exports = {
//   getDecksUser,
//   getDeckById,
//   createDeck,
//   updateDeck,
//   deleteDeck,
// };
