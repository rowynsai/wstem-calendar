const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dateTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  link: { type: String},
  subject: { type: String },
  location: { type: String},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});
module.exports = mongoose.model('Task', TaskSchema);
