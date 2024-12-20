const { Schema, model } = require('mongoose');

const userCollectionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    cardId: {
      type: Schema.Types.ObjectId,
      ref: 'card',
    },
  },
  { timestamps: true },
);

const UserCollection = model('user', userCollectionSchema);

module.exports = { UserCollection };
