const nodemailer = require('nodemailer');
const fs = require('fs');
const handlebars = require('handlebars');
const path = require('path');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmail(templateName, recipients, data) {
  if (!Array.isArray(recipients) || recipients.length === 0) {
    throw new Error('Recipients must be a non-empty array');
  }

  const filePath = path.join(__dirname, '..', 'emails', `${templateName}.html`);

  let source;
  try {
    source = fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    console.error(`Email template file not found: ${filePath}`, err);
    throw err;
  }

  const compiled = handlebars.compile(source);
  const html = compiled(data);

  const mailOptions = {
    from: `"UBC Women in STEM" <${process.env.EMAIL_USER}>`,
    to: recipients.join(','),
    subject: data.subject || 'Scheduled weekly Email',
    html,
  };

  return transporter.sendMail(mailOptions);
}

// //debugging, worked!
// async function sendTestEmail() {
//   const { buildDigestHTML } = require('./emailTemplates'); // ensure this path is correct

//   const testEvent = {
//     title: 'Test Event',
//     dateTime: new Date(),
//     location: 'Test Location',
//     link: 'http://example.com',
//     description: 'This is a test event.',
//   };

//   const digestHTML = buildDigestHTML([testEvent]);

//   try {
//     await sendEmail('digest', ['rowynsai@gmail.com'], {
//       firstName: 'Test User',
//       digestReports: digestHTML,
//       subject: 'Test Email from UBC Women in STEM',
//     });
//     console.log('✅ Test email sent!');
//   } catch (err) {
//     console.error('❌ Failed to send test email:', err);
//   }
// }
// module.exports = sendEmail;
// module.exports.sendTestEmail = sendTestEmail;

module.exports = sendEmail;