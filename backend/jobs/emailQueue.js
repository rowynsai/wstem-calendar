const sendEmail = require('../utils/mailer');
const emailQueue = require('./emailQueue');
const EmailLog = require('../logs/emailLogs');

emailQueue.process(5, async (job) => {
  const { template, recipients, data } = job.data;
  //debugging
  sendEmail('digest', ['your-email@example.com'], {
    firstName: 'Test User',
    digestReports: '<p>This is a test event</p>',
    subject: 'Test Email from UBC Women in STEM',
  })
  .then(() => console.log('Test email sent!'))
  .catch(console.error);

  try {
    await sendEmail(template, recipients, data);

    for (const recipient of recipients) {
      await EmailLog.create({
        timestamp: new Date(),
        recipient,
        template
      });
    }

    console.log('Email sent and logged!');
  } catch (err) {
    console.error('Failed to send email:', err);
  }
});

emailQueue.on('failed', (job, err) => {
  console.error('Job failed:', err.message);
});