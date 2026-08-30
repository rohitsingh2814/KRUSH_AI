const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        imageUrl: {
            type: String
        },

        occasion: {
            type: String,
            required: true
        },

        appearance: {
            skinTone: String,
            undertone: String,
            confidence: Number
        },

        colors: {
            recommended: [String],
            avoid: [String]
        },

        style: {
            currentStyle: String,
            formality: String
        },

        outfit: {
            top: String,
            bottom: String,
            shoes: String,
            accessories: [String]
        },

        shoppingQueries: [String],

        products: [
            {
                title: String,
                source: String,
                price: String,
                image: String,
                productLink: String,
                rating: Number,
                reviews: Number
            }
        ]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Analysis",
    analysisSchema
);