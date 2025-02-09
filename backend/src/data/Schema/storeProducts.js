const mongoose = require('mongoose');

const StoreProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: {
    pixelcoins: { type: Number, required: false },
    pixelgems: { type: Number, required: false },
    euros: { type: Number, required: false },
  },
  reward: {
    cards: { type: Number, default: 0 },
    pixelcoins: { type: Number, default: 0 },
  },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model('StoreProduct', StoreProductSchema);
