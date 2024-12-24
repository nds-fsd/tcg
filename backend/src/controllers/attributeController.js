const { Attribute } = require('../data/schemas/attribute');

const getAttributes = async (req, res) => {
  try {
    const attributes = await Attribute.find();
    res.status(200).json(attributes);
  } catch (error) {
    res.status(500).json([{ error: error.message }, { "Error manual": "Error en la obtención de atributos" }]);
  }
};

const createAttribute = async (req, res) => {
  try {
    const { name } = req.body;
    const existingAttribute = await Attribute.findOne({ name });
    if (existingAttribute) {
      return res.status(400).json({ error: 'Attribute already exists' });
    }
    const newAttribute = new Attribute({ name });
    await newAttribute.save();
    res.status(201).json(newAttribute);
  } catch (error) {
    res.status(500).json([{ error: error.message }, { "Error manual": "Error al crear atributo" }]);
  }
};

const updateAttributeById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedAttribute = await Attribute.findByIdAndUpdate(id, { name }, { new: true });
    if (!updatedAttribute) {
      return res.status(404).json({ error: 'Attribute not found' });
    }
    res.status(200).json(updatedAttribute);
  } catch (error) {
    res.status(500).json([{ error: error.message }, { "Error manual": "Error al actualizar atributo" }]);
  }
};

const deleteAttributeById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAttribute = await Attribute.findByIdAndDelete(id);
    if (!deletedAttribute) {
      return res.status(404).json({ error: 'Attribute not found' });
    }
    res.status(200).json({ message: 'Attribute deleted successfully' });
  } catch (error) {
    res.status(500).json([{ error: error.message }, { "Error manual": "Error al eliminar atributo" }]);
  }
};

module.exports = {
  getAttributes,
  createAttribute,
  updateAttributeById,
  deleteAttributeById,
};
