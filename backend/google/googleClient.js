const { google } = require('googleapis');
require('dotenv').config();

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

// Set up the JWT client
const auth = new google.auth.JWT(
  process.env.client_email,
  null,
  process.env.private_key.replace(/\\n/g, '\n'), // fix line breaks
  SCOPES
);

const calendar = google.calendar({ version: 'v3', auth });

module.exports = calendar;
