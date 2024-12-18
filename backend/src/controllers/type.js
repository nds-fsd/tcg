const Type = require('../data/Schema/type');

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

module.exports = { 
    getTypes,
    createType
};