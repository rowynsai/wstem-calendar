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

router.post('/', async (req, res) => {
  try {
    const event = req.body;

    const response = await calendar.events.insert({
      calendarId: process.env.calendar_id,
      resource: event,
    });

    res.status(201).json({ newEvent: response.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save event' });
  }
});


module.exports = router;
