const express = require('express');
const { createDeck, getUserDecks, updateDeck, deleteDeck } = require('../controllers/deck');
const isAuthenticated = require('../middleware/isAuthenticatedTest');

const router = express.Router();

// Routes
router.post('/', isAuthenticated, createDeck); // Create a new deck
router.get('/', isAuthenticated, getUserDecks); // Get all decks for the logged-in user
router.put('/:deckId', isAuthenticated, updateDeck); // Update a specific deck
router.delete('/:deckId', isAuthenticated, deleteDeck); // Delete a specific deck

module.exports = router;
