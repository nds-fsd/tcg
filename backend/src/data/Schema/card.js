const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema(
{
    name: { type: String, required: true },
    image: { type: String, required: true },
    attribute: { type: String, required: true, enum: ['fire', 'water', 'earth', 'air', 'darkness', 'light'] },
    type: { type: String, required: true, enum: ['beast', 'warrior', 'fairy', 'demon', 'zombie'] },
    description: { type: String, required: true },
    rarity: { type: String, required: true, enum: ['common', 'rare', 'epic', 'legendary'] },
},
{ timestamps: true }
);

module.exports = mongoose.model('Card', cardSchema);
