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

function sendEmail(templateName, recipients, data) {
  const filePath = path.join(__dirname, '..', 'emails', `${templateName}.html`);
  const source = fs.readFileSync(filePath, 'utf8');
  const compiled = handlebars.compile(source);
  const html = compiled(data);

  const mailOptions = {
    from: `"UBC Women in STEM" <${process.env.EMAIL_USER}>`,
    to: recipients.join(','),
    subject: data.subject || 'Scheduled weekly Email',
    html
  };

  return transporter.sendMail(mailOptions);
}

module.exports = sendEmail;