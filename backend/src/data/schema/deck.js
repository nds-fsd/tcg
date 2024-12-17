const mongoose = require('mongoose');

const deckSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Link to the User schema
      required: true,
    },
    cards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card', // Link to the Card schema
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Deck', deckSchema);
