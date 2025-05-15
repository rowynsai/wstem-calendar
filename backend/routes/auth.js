const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// User reg
router.post('/register', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({ ...req.body, password: hashedPassword });
    await user.save();
    res.json({ message: 'User registered '})
});

// User login
router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password)))
        {
            return res.statusMessage(400).json({ message: 'Invalid credentials' });
        }
    const token = jwt.sign({ id: user._id }, 'secret');
    res.json({ token});
    await user.save();
});

module.exports = router;