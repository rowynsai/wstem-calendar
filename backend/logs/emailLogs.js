const mongoose = require('mongoose');
const { Schema } = mongoose;

const EmailLogSchema = new Schema({
  timestamp: Date,
  recipient: String,
  template: String,
});

module.exports = mongoose.model('EmailLog', EmailLogSchema);