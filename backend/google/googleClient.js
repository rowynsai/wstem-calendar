const { google } = require('googleapis');
require('dotenv').config();

// Create OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.client_id,
  process.env.client_secret,
  process.env.redirect_uri
);

// Check if we have tokens stored and set them
if (process.env.GOOGLE_REFRESH_TOKEN) {
  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
  });
}

// Create Google Calendar client
const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

module.exports = calendar;