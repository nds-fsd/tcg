const { Schema, model } = require('mongoose');

const userCollectionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    cardId: {
      type: Schema.Types.ObjectId,
      ref: 'Card',
    },
    amount: {
      type: String,
      default: 1
    },
  },
  { timestamps: true },
);

const UserCollection = model('UserCollection', userCollectionSchema);

module.exports = { UserCollection };
