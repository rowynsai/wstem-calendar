const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const { google } = require('googleapis');
const emailRoutes = require('./routes/email');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', emailRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Your existing routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/calendar', require('./routes/calendar'));
// Google OAuth2 setup
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

// Endpoint to get Google OAuth URL
app.get('/auth/google/url', (req, res) => {
  const scopes = ['https://www.googleapis.com/auth/calendar.readonly']; // example scope
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });
  res.send({ url });
});

// OAuth2 callback endpoint
app.get('/auth/google/callback', async (req, res) => {
  const code = req.query.code;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    // Save tokens to DB or session here if needed
    res.send('Google OAuth successful, tokens acquired!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Authentication failed');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
