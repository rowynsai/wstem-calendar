const cron = require('node-cron');
const emailQueue = require('./emailQueue');
const User = require('../models/User');

// weekly digest monday at 9 AM
// H H M M frequency
cron.schedule('0 9 * * 1', async () => {
    try {
        // are there users who opted in?
        const users = await User.find({emails: true});
        for (const user of users) {
            emailQueue.add({
                template: 'digest',
                recipients: [user.email],
                data: {
                  firstName: user.name,
                  digestReports: '<ul><li>Event TODO</li>></ul>',
                  subject: 'Your Weekly UBC Women in STEM Digest'
                }
              });
        }
    }   catch (err) {
        console.error('Failed to schedule weekly emails:', err);
    }
});
