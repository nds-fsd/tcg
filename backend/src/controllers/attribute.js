const {Attribute} = require('../data/Schema/attribute');

const getAttributes = async (req, res) => {
try {
    const attributes = await Attribute.find();
    res.status(200).json(attributes);
    } catch (error) {
        res.status(500).json({ error: error.message });
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
            res.status(500).json({ error: error.message });
        }
};

const updateAttribute = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updatedAttribute = await Attribute.findByIdAndUpdate(
            id,
            { name },
            { new:true }
        );
        if (!updatedAttribute) {
            return res.status(404).json({ error: 'Attribute not found' });
        }
        res.status(200).json(updatedAttribute);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteAttribute = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAttribute = await Attribute.findByIdAndDelete(id);
        if (!deletedAttribute) {
            return res.status(404).json({ error: 'Attribute not found' });
        }
        res.status(200).json({ message: 'Attribute deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } 
};

module.exports = { 
    getAttributes,
    createAttribute,
    updateAttribute,
    deleteAttribute
};
