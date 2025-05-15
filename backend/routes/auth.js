const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// User reg
router.post('/register', async (req, res) => {
    try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({ ...req.body, password: hashedPassword });
    await user.save();
    res.json({ message: 'User registered '});
} catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
}
});

// User login
router.post('/login', async (req, res) => {
    try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password)))
        {
            return res.statusMessage(400).json({ message: 'Invalid credentials' });
        }
    const token = jwt.sign({ id: user._id }, 'secret');
    res.json({
        message: 'Login successful',
        token,
        user: { email: user.email }
    });
} catch (error) {
    res.status(500).json({ message: 'Login error', error: error.message });
}
});

module.exports = router;