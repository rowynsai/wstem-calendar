const mongoose = require('mongoose');

const dailyCardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cardId: {
    type: String,
    required: true
  },
  cardName: {
    type: String,
    required: true
  },
  reversed: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// One daily card per user per day
dailyCardSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('DailyCard', dailyCardSchema);