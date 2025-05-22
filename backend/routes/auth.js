const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Hardcoded user for testing:
const hardcodedUser = [
    {
    email: "testeruser@gmail.com",
    password: "password123",
    id: "63a1f1a45b3e8c35f2a9d8e1",
    name: "Test User",
    preferences: { "Math": true, "CPSC": false },
    isAdmin: false,
    emails: false
  },
  {
    email: "rowynsai@gmail.com",
    password: "password123",
    id: "q3a1f1a45b3e8c35f2a9d8e1",
    name: "Admin User",
    preferences: { "Math": true, "CPSC": true },
    isAdmin: true,
    emails: true
  },
];

// try parsing pref?
function parsePreference(preferences) {
  if (!preferences) return {};
  if (typeof preferences === 'object') return preferences;
  try {
    return JSON.parse(preferences);
  } catch {
    return {};
  }
}

// User reg
router.post('/register', async (req, res) => {
    const { name, email, password, preferences, isAdmin, adminKey, emails } = req.body;
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
      const preferencesParsed = parsePreference(preferences);

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
            preferences: hardcoded.preferences || {},
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

    const token = jwt.sign({id: user.id }, 'secret');
    res.json({
      token,
      user: {
        id: user.id,
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
router.get('/preferences/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean();
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ preferences: user.preferences || {} });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching preferences', error: err.message });
  }
});

// update user preferences
router.post('/preferences', async (req, res) => {
  try {
    const { id, preferences } = req.body;
    if (!id || !preferences) {
      return res.status(400).json({ message: 'Missing id or preferences' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { preferences },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'Preferences updated', preferences: updatedUser.preferences });
  } catch (err) {
    res.status(500).json({ message: 'Error updating preferences', error: err.message });
  }
});

// update profile
router.post('/update', async (req, res) => {
  try {
    let { id, name, email, password, preferences, isAdmin, emails } = req.body;

    // handle id possibly being an object like { $oid: "..." }, was in mongoDB
    if (typeof id === 'object' && id !== null && '$oid' in id) {
      id = id.$oid;
    }

    if (!id) {
      return res.status(400).json({ message: 'Missing id' });
    }

    // check if id is one of the hardcoded user IDs (DONT update them)
    const hardcodedIds = ["63a1f1a45b3e8c35f2a9d8e1", "q3a1f1a45b3e8c35f2a9d8e1"];
    if (hardcodedIds.includes(id)) {
      return res.status(400).json({ message: "Cannot update hardcoded user" });
    }

    const updateData = {
      name,
      email,
      preferences,
      isAdmin,
      emails,
    };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.json({
      message: 'User updated successfully',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        preferences: updatedUser.preferences,
        isAdmin: updatedUser.isAdmin,
        emails: updatedUser.emails,
      },
    });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ message: 'Profile update failed', error: err.message });
  }
});


module.exports = router;