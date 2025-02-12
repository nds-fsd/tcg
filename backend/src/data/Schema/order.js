const { Schema, model } = require('mongoose');

const OrderSchema = new Schema(
  {
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
}
);

const Order = model('Order', OrderSchema);
module.exports = { Order };