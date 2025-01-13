const { Type } = require('../data/Schema/type');

const getTypes = async (req, res) => {
  try {
    const types = await Type.find();
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
  }
};

const updateType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedType = await Type.findByIdAndUpdate(id, { name }, { new: true });
    if (!updatedType) {
      return res.status(404).json({ error: 'Type not found' });
    }
    res.status(200).json(updatedType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteType = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedType = await Type.findByIdAndDelete(id);
    if (!deletedType) {
      return res.status(404).json({ error: 'Type not found' });
    }
    res.status(200).json({ message: 'Type deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTypes,
  createType,
  updateType,
  deleteType,
};
