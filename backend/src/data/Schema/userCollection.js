const { Schema, model } = require('mongoose');

const userCollectionSchema = new Schema(
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
        },
        amount: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true },
);

const UserCollection = model('UserCollection', userCollectionSchema);

module.exports = { UserCollection };
