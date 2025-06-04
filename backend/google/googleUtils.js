// googleUtils.js
const calendar = require('./googleClient');

const createCalendarEvent = async ({ title, description, date, startTime, endTime, subject }) => {
  if (!date || !startTime || !endTime) {
    throw new Error('Missing date, start time, or end time');
  }

  const startDateTime = `${date}T${startTime}:00`;
  const endDateTime = `${date}T${endTime}:00`;

  const event = {
    summary: title || 'No Title',
    description: description || '',
    extendedProperties: {
      private: {
        subject: subject || '',
      },
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

  return response.data;
};

module.exports = {
  createCalendarEvent,
};
