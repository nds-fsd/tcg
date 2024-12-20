const { Type } = require('../data/schemas/type');

const getTypes = async (req, res) => {
  try {
    const types = await Type.find();
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json([{ error: error.message }, { "Error manual": "Error en la optención de tipos" }]);
  }
};

const createType = async (req, res) => {
  try {
    const { name } = req.body;
    const existingType = await Type.findOne({ name });
    if (existingType) {
      return res.status(400).json({ error: 'Type already exists' });
    }
    const newType = new Type({ name });
    await newType.save();
    res.status(201).json(newType);
  } catch (error) {
    res.status(500).json([{ error: error.message }, { "Error manual": "Error en la creación del tipo" }]);
  }
};

const updateTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedType = await Type.findByIdAndUpdate(id, { name }, { new: true });
    if (!updatedType) {
      return res.status(404).json({ error: 'Type not found' });
    }
    res.status(200).json(updatedType);
  } catch (error) {
    res.status(500).json([{ error: error.message }, { "Error manual": "Error en la actualización del tipo" }]);
  }
};

const deleteTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedType = await Type.findByIdAndDelete(id);
    if (!deletedType) {
      return res.status(404).json({ error: 'Type not found' });
    }
    res.status(200).json({ message: 'Type deleted successfully' });
  } catch (error) {
    res.status(500).json([{ error: error.message }, { "Error manual": "Error, no sa ha podido eliminar el tipo" }]);
  }
};

module.exports = {
  getTypes,
  createType,
  updateTypeById,
  deleteTypeById,
};
