const { Schema, model } = require('mongoose');

const cardSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    attribute: { type: Schema.Types.ObjectId, ref: 'Attribute', required: true },
    type: { type: Schema.Types.ObjectId, ref: 'Type', required: true },
    description: { type: String, required: true },
    rarity: { type: String, required: true, enum: ['common', 'rare', 'epic', 'legendary'] },
    category: { type: String, required: true, enum: ['monster', 'support', 'fusion'] },
    expansion: { type: String, required: true },
    atk: { type: Number, required: true },
    def: { type: Number, required: true },
    effect: { type: String, required: true },
  },
  { timestamps: true },
);

const Card = model('Card', cardSchema);
module.exports = { Card };
