const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    preferences: {
        type: Object,
        default: {}
      },
    isAdmin: { type: Boolean, default: false },
    emails: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', UserSchema);