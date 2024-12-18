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

module.exports = { 
    getAttributes,
    createAttribute
};
