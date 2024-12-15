const Card = require('../data/Schema/card');

const getCards = (req, res) => {
    res.json(cards)
}

const createCard = (req, res) => {
    const { name, image, attribute, type, description, rarity } = req.body;

    const newCard = {
    id,
    name,
    image,
    attribute,
    type,
    description,
    rarity
};

    cards.push(newCard);
    res.status(201).json(newCard);
};

const getCardById = (req, res) => {
    const CardId = Number(req.params.id);
    const existingCard =  cards.find((card)=> card.id === cardId);

    if (existingCard === undefined) {
        return res.status(404).json({ error: 'Card not found' });
    }

    res.status(200).json(existingCard)
}

const updateCard = (req, res) => {

    const CardId = Number(req.params.id);
    const { name, image, attribute, type, description, rarity } = req.body;
    const existingCard = cards.find((card) => card.id === cardId);

    if (!existingCard) {
        return res.status(404).json({ error: "Card not found" });
    }

    const updatedCard = {
        id: existingCard.id,
        name: name || existingCard.name,
        image: image || existingCard.image,
        attribute: attribute || existingCard.attribute,
        type: type || existingCard.type,
        description: description || existingCard.description,
        rarity: rarity || existingCard.rarity
    };

    const existingCardIndex = cards.findIndex((card) => card.id === cardId);
    cards.splice(existingCardIndex, 1, updatedCard);

    res.status(200).json(updatedCard);
}

const deleteCard = (req, res) => {
    const idToDelete = Number(req.params.id);
    const existingCardIndex = cards.findIndex((card) => card.id === idToDelete);

    if (existingCardIndex === -1) {
        return res.status(404).json({ error: "Card not found" });
    }

    todos.splice(existingCardIndex, 1);

    res.status(204).json({ status: "success" });
}

module.exports = {
    getCards,
    createCard,
    getCardById,
    updateCard,
    deleteCard
}