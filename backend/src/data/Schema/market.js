const { Schema, model } = require('mongoose');

const marketSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    cards: [
      {
        cardId: {
          type: Schema.Types.ObjectId,
          ref: 'Card',
          required: true,
        },
        amount: {
          type: Number,
          default: 1,
          min: 1,
        },
      },
    ],
  },
  { timestamps: true },
);

const Market = model('Market', marketSchema);
module.exports = { Market };
