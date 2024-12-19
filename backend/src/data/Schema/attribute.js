const {Schema, model} = require('mongoose');


const attributeSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const Attribute = model('Attribute', attributeSchema);
module.exports = {Attribute};