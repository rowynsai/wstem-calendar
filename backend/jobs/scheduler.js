const cron = require('node-cron');
const User = require('../models/User');
const Event = require('../models/Task');
const { startOfWeek, addDays } = require('date-fns');
const { buildDigestHTML } = require('../utils/emailTemplates');
const sendEmail = require('../utils/mailer');  // import your mailer function

// weekly digest scheduled every minute for testing (change to desired schedule)
cron.schedule('* * * * *', async () => {
  try {
    // get users who opted in for emails
    const users = await User.find({ emails: true });
    const now = new Date();
    const monday = startOfWeek(now, { weekStartsOn: 1 }); // ISO Monday start
    const sunday = addDays(monday, 7);

    // get events this week
    const weeklyEvents = await Event.find({
      dateTime: { $gte: monday, $lt: sunday }
    });
    console.log('--- Events this week ---');
    console.log(weeklyEvents);
    if (!weeklyEvents.length) {
      console.log("No events this week.");
      return;
    }

    for (const user of users) {
      // filter events by user preferences if any
      const userEvents = weeklyEvents.filter(e =>
        !user.preferences?.subjects?.length || user.preferences.subjects.includes(e.subject)
      );

      if (userEvents.length === 0) continue;

      const digestHTML = buildDigestHTML(userEvents);

      // send email directly
      await sendEmail('digest', [user.email], {
        firstName: user.name,
        digestReports: digestHTML,
        subject: 'Your Weekly UBC Women in STEM Digest',
      });

      console.log(`Email sent to ${user.email}`);
    }
  } catch (err) {
    console.error('Failed to send weekly emails:', err);
  }
});
