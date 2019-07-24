const { Schema, model } = require('mongoose');

const GameSchema = new Schema({
    title: { type: String, required: true },
    availableConsole: { type: String, required: true },
    price: { type: String, required: true },
    imagePath: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

module.exports = model('Game', GameSchema);
