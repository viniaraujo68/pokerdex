// backend/models/PokerNight.js
const mongoose = require('mongoose');

const pokerNightSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  place: {
    type: String,
    required: true
  },
  totalPot: {
    type: Number,
    required: true
  },
  players: [{
    playerName: {
      type: String,
      required: true
    },
    profit: {
      type: Number,
      required: true
    }
  }]
});

const PokerNight = mongoose.model('PokerNight', pokerNightSchema);

module.exports = PokerNight;