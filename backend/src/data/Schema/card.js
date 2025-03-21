const { Schema, model } = require('mongoose');

const cardSchema = new Schema(
  {
    number: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      default: 'assets/CardImg/cardplaceholdertcg.png',
    },
    attribute: {
      type: String,
      enum: ['darkness', 'light', 'earth', 'fire', 'wind', 'water', 'none'],
      default: 'none',
    },
    type: {
      type: String,
      required: true,
      enum: [
        'zombie',
        'beast',
        'warrior',
        'fairy',
        'demon',
        'normal',
        'insect',
        'dragon',
        'plant',
        'machine',
        'rock',
        'fish',
        'continuous',
        'instant',
        'equipment',
        'counter',
      ],
    },
    description: {
      type: String,
      required: true,
    },
    rarity: {
      type: String,
      required: true,
      enum: ['common', 'rare', 'epic', 'legendary'],
    },
    category: {
      type: String,
      required: true,
      enum: ['monster', 'support', 'fusion'],
    },
    expansion: {
      type: [String],
      required: true,
    },
    atk: { type: Number },
    def: { type: Number },
    effect: {
      type: String,
      required: true,
    },
    level: { type: Number },
    foil: {
      type: Boolean,
      default: false,
    },
    estado: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const Card = model('Card', cardSchema);
module.exports = { Card };
