require('dotenv').config();
const Imap = require('imap');
const { simpleParser } = require('mailparser');
const options = ["Math", "CPSC", "Chem", "Biol", "Phys", "Eng"];
const imapConfig = {
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASS,
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  tls: true,
  tlsOptions: {
    // TODO revisit, safe? "accepts self-signed certificate", whateva that means
    rejectUnauthorized: false,
  }
};
// ROUGH code following
const extractEventDetails = (subjectLine, bodyText) => {
    const lowerText = bodyText.toLowerCase();
  
    if (!lowerText.includes("women") && !lowerText.includes("woman")) {
      return null;
    }
  
    const event = {
      name: subjectLine || "Untitled Event",
      description: bodyText.slice(0, 300), // grab a preview
      subject: null,
      dateTime: null,
    };
  
    // subject classification (simple keyword-based)
    for (const s of options) {
      if (lowerText.includes(s)) {
        event.subject = s;
        break;
      }
    }
  
    // date/time extraction wtf stolen from stack-overflow
    const dateRegex = /\b(?:on\s+)?(\w+\s+\d{1,2}(?:st|nd|rd|th)?,?\s+\d{4})\b/i;
    const timeRegex = /\b(?:at\s+)?(\d{1,2}(:\d{2})?\s*(am|pm))\b/i;
  
    const dateMatch = bodyText.match(dateRegex);
    const timeMatch = bodyText.match(timeRegex);
  
    if (dateMatch || timeMatch) {
      event.dateTime = `${dateMatch?.[1] || ""} ${timeMatch?.[1] || ""}`.trim();
    }
  
    return event;
  };

const getEmails = () => {
  return new Promise((resolve, reject) => {
    const imap = new Imap(imapConfig);
    const results = [];

    imap.once('ready', () => {
      imap.openBox('INBOX', false, () => {
        imap.search(['UNSEEN', ['SINCE', new Date()]], (err, uids) => {
          if (err || !uids || !uids.length) {
            imap.end();
            return resolve([]); // no new emails
          }

          const f = imap.fetch(uids, { bodies: '' });

          f.on('message', msg => {
            msg.on('body', stream => {
              simpleParser(stream, async (err, parsed) => {
                if (err) return reject(err);
                const { from, subject, text } = parsed;

                // check if wstem event
                const parsedEvent = extractEventDetails(subject, text || "");
                if (parsedEvent) {
                  results.push({
                    from,
                    subject,
                    ...parsedEvent,
                  });
                }
              });
            });

            msg.once('attributes', attrs => {
              imap.addFlags(attrs.uid, ['\\Seen'], () => {
                console.log('Marked as read');
              });
            });
          });

          f.once('end', () => {
            imap.end();
            resolve(results);
          });

          f.once('error', ex => {
            reject(ex);
          });
        });
      });
    });

    imap.once('error', err => {
      console.error('IMAP Error:', err);
      reject(err);
    });

    imap.connect();
  });
};

module.exports = { getEmails };