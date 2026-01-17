const mongoose = require('mongoose');

const readingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cards: [{
    cardId: String,
    name: String,
    position: String,
    reversed: Boolean
  }],
  question: {
    type: String,
    default: ''
  },
  spreadType: {
    type: String,
    enum: ['single', 'three-card', 'celtic-cross'],
    default: 'three-card'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Reading', readingSchema);