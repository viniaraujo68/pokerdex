const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  totalProfit: {
    type: Number,
    default: 0
  },
  nightNumber: {
    type: Number,
    default: 0
  },
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;