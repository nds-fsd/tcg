const { Schema, model } = require('mongoose');

const deckSchema = new Schema(
  {
    deckTitle: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    cards: [
      {
        card: {
          type: Schema.Types.ObjectId,
          ref: 'Card',
          required: true,
        },
        amount: {
          type: Number,
          required: true,
          max: [3],
        },
      },
    ],
    fusionCards: [
      {
        card: {
          type: Schema.Types.ObjectId,
          ref: 'Card',
          required: true,
        },
        amount: {
          type: Number,
          required: true,
          max: [3],
        },
      },
    ],
  },
  { timestamps: true },
);

const Deck = model('Deck', deckSchema);
module.exports = { Deck };
