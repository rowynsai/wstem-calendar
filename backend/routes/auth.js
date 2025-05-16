const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Hardcoded user for testing:
const hardcodedUser = {
    email: "rowynsai@gmail.com",
    password: "password123",  // For quick testing only! Never store plain passwords in production.
    id: "12345",
    name: "Test User"
  };

// User reg
router.post('/register', async (req, res) => {
    const { name, email, password, preference } = req.body;
    try {
      // Check if user exists
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: 'User already exists' });
  
      // Create user - hash password, save name and preference
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        preferences: preference, // Save preference here, or adapt to your schema
      });
  
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Registration error', error: err.message });
    }
  });
  

// User login
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if email matches hardcoded user
      if (email === hardcodedUser.email) {
        // Check password against hardcoded password (plain text)
        if (password === hardcodedUser.password) {
          // Create a fake token for the hardcoded user (you can customize secret)
          const token = jwt.sign({ id: hardcodedUser.id }, 'secret');
  
          return res.json({
            message: 'Login successful (hardcoded user)',
            token,
            user: { email: hardcodedUser.email, name: hardcodedUser.name }
          });
        } else {
          return res.status(400).json({ message: 'Invalid credentials (hardcoded user)' });
        }
      }
  
    console.log("Checking DB user");
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found in DB");
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password mismatch in DB user");
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, 'secret');
    res.json({
      //message: 'Login successful', TODO
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        preferences: user.preferences || {},
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: 'Login error', error: error.message });
  }
});
  
  module.exports = router;