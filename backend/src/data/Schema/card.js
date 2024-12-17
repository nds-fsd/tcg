const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    attribute: { type: mongoose.Schema.Types.ObjectId, ref: 'Attribute', required: true },
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Type', required: true },
    description: { type: String, required: true },
    rarity: { type: String, required: true, enum: ['common', 'rare', 'epic', 'legendary'] },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Card', cardSchema);
