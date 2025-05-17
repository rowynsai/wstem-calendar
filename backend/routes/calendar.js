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
    const { title, description, date, startTime, endTime } = req.body;

    if (!date || !startTime || !endTime) {
      return res.status(400).json({ error: "Missing date, start time, or end time" });
    }

    // Combine date and times into ISO strings
    const startDateTime = new Date(`${date}T${startTime}:00`).toISOString();
    const endDateTime = new Date(`${date}T${endTime}:00`).toISOString();

    // Create Google Calendar event resource object
    const event = {
      summary: title || 'No Title',
      description: description || '',
      start: {
        dateTime: startDateTime,
        timeZone: 'PST', // or your preferred timezone like 'America/New_York'
      },
      end: {
        dateTime: endDateTime,
        timeZone: 'PST', // keep consistent timezone
      },
    };

    const response = await calendar.events.insert({
      calendarId: process.env.calendar_id,
      resource: event,
    });

    res.status(201).json({ newEvent: response.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save event', details: error.message });
  }
});

module.exports = router;
