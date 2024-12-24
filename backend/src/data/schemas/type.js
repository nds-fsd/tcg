const { Schema, model } = require('mongoose');

const typeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Type = model('Type', typeSchema);

module.exports = { Type };
