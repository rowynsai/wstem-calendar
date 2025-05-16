const express = require('express');
const router = express.Router();
const calendar = require('../google/googleClient');

router.get('/', async (req, res) => {
  try {
    const response = await calendar.events.list({
      calendarId: process.env.calendar_id,
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });
     // response.data.items is an array of events
     res.json({ events: response.data.items || [] });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

module.exports = router;
