const Deck = require('../models/Deck');
const Card = require('../models/Card');
const mongoose = require('mongoose');

// Create a new deck
exports.createDeck = async (req, res) => {
  try {
    const { name, cards } = req.body;

    // Use the user ID from the middleware
    const ownerId = req.user._id;

    // Validate card IDs
    for (const cardId of cards) {
      if (!mongoose.Types.ObjectId.isValid(cardId)) {
        return res.status(400).json({ success: false, message: `Invalid card ID: ${cardId}` });
      }

      const cardExists = await Card.findById(cardId);
      if (!cardExists) {
        return res.status(404).json({ success: false, message: `Card not found: ${cardId}` });
      }
    }

    const newDeck = await Deck.create({
      name,
      owner: ownerId,
      cards,
    });

    res.status(201).json({ success: true, deck: newDeck });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all decks for the logged-in user
exports.getUserDecks = async (req, res) => {
  try {
    const ownerId = req.user._id;

    const decks = await Deck.find({ owner: ownerId }).populate('cards');
    res.status(200).json({ success: true, decks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a specific deck
exports.updateDeck = async (req, res) => {
  try {
    const { deckId } = req.params;
    const { name, cards } = req.body;

    const ownerId = req.user._id;

    const deck = await Deck.findById(deckId);
    if (!deck) {
      return res.status(404).json({ success: false, message: 'Deck not found' });
    }

    if (deck.owner.toString() !== ownerId.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized to edit this deck' });
    }

    const updatedDeck = await Deck.findByIdAndUpdate(deckId, { name, cards }, { new: true }).populate('cards');

    res.status(200).json({ success: true, deck: updatedDeck });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a deck
exports.deleteDeck = async (req, res) => {
  try {
    const { deckId } = req.params;

    const ownerId = req.user._id;

    const deck = await Deck.findById(deckId);
    if (!deck) {
      return res.status(404).json({ success: false, message: 'Deck not found' });
    }

    if (deck.owner.toString() !== ownerId.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized to delete this deck' });
    }

    await deck.deleteOne();

    res.status(200).json({ success: true, message: 'Deck deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
