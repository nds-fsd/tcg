const { Schema, model } = require('mongoose');

const deckSchema = new Schema(
    {
        deckTitle: {
            type: String,
            trim: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        cards: [
            {
                cardId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Card',
                    required: true
                },
                amount: {
                    type: Number,
                    required: true
                },
            },
        ],
        public: {
            type: boolean,
            default: false
        }
    },
    { timestamps: true },
);

const Deck = model('Deck', deckSchema);
module.exports = { Deck };
