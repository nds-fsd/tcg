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
    cantidad: {
      type: String,
    },
  },
  { timestamps: true },
);

const UserCollection = model('UserCollection', userCollectionSchema);

module.exports = { UserCollection };
