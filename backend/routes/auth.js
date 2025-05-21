const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const ADMIN_SECRET_KEY = "iloverowyn";

// Hardcoded user for testing:
const hardcodedUser = [
    {
    email: "testeruser@gmail.com",
    password: "password123",
    id: "12345",
    name: "Test User",
    preference: { "Math": true, "CPSC": false },
    isAdmin: false,
    emails: false
  },
  {
    email: "rowynsai@gmail.com",
    password: "password123",
    id: "67890",
    name: "Admin User",
    preference: { "Math": true, "CPSC": false },
    isAdmin: true,
    emails: true
  },
];

// try parsing pref?
function parsePreference(preference) {
  if (!preference) return {};
  if (typeof preference === 'object') return preference;
  try {
    return JSON.parse(preference);
  } catch {
    return {};
  }
}

// User reg
router.post('/register', async (req, res) => {
    const { name, email, password, preference, isAdmin, adminKey } = req.body;
    try {
      // Check if user exists
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: 'User already exists' });
        
      // if they (wrongly!) try to be admin
      if (isAdmin && adminKey !== ADMIN_SECRET_KEY) {
        return res.status(403).json({ message: 'Invalid admin key' });
      }
      // Create user - hash password, save name and preference
      const hashedPassword = await bcrypt.hash(password, 10);
      const preferencesParsed = parsePreference(preference);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        preferences: preferencesParsed,
        isAdmin: !!isAdmin,
        emails: !!emails,
      });
  
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      console.error("Registration error:", err);
      res.status(500).json({ message: 'Registration error', error: err.message });
    }
  });
  

// User login
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
    // Check if email matches hardcoded user
    const hardcoded = hardcodedUser.find(u => u.email === email);

    if (hardcoded) {
      if (password === hardcoded.password) {
        const token = jwt.sign({ id: hardcoded.id }, 'secret');

        return res.json({
          message: 'Login successful (hardcoded user)',
          token,
          user: {
            id: hardcoded.id,
            email: hardcoded.email,
            name: hardcoded.name,
            preferences: hardcoded.preference || {},
            isAdmin: hardcoded.isAdmin,
            emails: hardcoded.emails,
          }
        });
      } else {
        return res.status(400).json({ message: 'Invalid credentials (hardcoded user)' });
      }
    }
    
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
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        preferences: user.preferences || {},
        isAdmin: user.isAdmin,
        emails: user.emails,
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: 'Login error', error: error.message });
  }
});
  
// get user pref
router.get('/preferences/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).lean();
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ preferences: user.preferences || {} });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching preferences', error: err.message });
  }
});

// update user preferences
router.post('/preferences', async (req, res) => {
  try {
    const { userId, preferences } = req.body;
    if (!userId || !preferences) {
      return res.status(400).json({ message: 'Missing userId or preferences' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { preferences },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'Preferences updated', preferences: updatedUser.preferences });
  } catch (err) {
    res.status(500).json({ message: 'Error updating preferences', error: err.message });
  }
});

module.exports = router;