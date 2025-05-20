const express = require('express');
const router = express.Router();
const calendar = require('../google/googleClient');

// GET upcoming events
router.get('/', async (req, res) => {
  try {
    const response = await calendar.events.list({
      calendarId: process.env.calendar_id,
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = response.data.items || [];
    console.log("Fetched events:", events);

    res.json({ events: response.data.items || [] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// POST new event
router.post('/', async (req, res) => {
  try {
    const { title, description, date, startTime, endTime, subject} = req.body;

    if (!date || !startTime || !endTime) {
      return res.status(400).json({ error: "Missing date, start time, or end time" });
    }

    const startDateTime = new Date(`${date}T${startTime}:00`).toISOString();
    const endDateTime = new Date(`${date}T${endTime}:00`).toISOString();

    const event = {
      summary: title || 'No Title',
      description: description || '',
      extendedProperties: {
        private: {
          subject: subject || '',
        }
      },
      start: {
        dateTime: startDateTime,
        timeZone: 'America/Los_Angeles',
      },
      end: {
        dateTime: endDateTime,
        timeZone: 'America/Los_Angeles',
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

// PUT update an existing event
router.put('/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;
    const { title, description, date, startTime, endTime, subject} = req.body;

    if (!date || !startTime || !endTime) {
      return res.status(400).json({ error: "Missing date, start time, or end time" });
    }

    const startDateTime = new Date(`${date}T${startTime}:00`).toISOString();
    const endDateTime = new Date(`${date}T${endTime}:00`).toISOString();

    const updatedEvent = {
      summary: title || 'No Title',
      description: description || '',
      extendedProperties: {
        private: {
          subject: subject || '',  // store subject here
        }
      },
      start: {
        dateTime: startDateTime,
        timeZone: 'America/Los_Angeles',
      },
      end: {
        dateTime: endDateTime,
        timeZone: 'America/Los_Angeles',
      },
    };

    const response = await calendar.events.update({
      calendarId: process.env.calendar_id,
      eventId,
      resource: updatedEvent,
    });

    res.json({ updatedEvent: response.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update event', details: error.message });
  }
});

// DELETE an event
router.delete('/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;
    console.log("Deleting Google Calendar event with ID:", eventId);

    await calendar.events.delete({
      calendarId: process.env.calendar_id,
      eventId,
    });

    res.json({ message: 'Event deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});



module.exports = router;
