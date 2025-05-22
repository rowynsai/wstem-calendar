require('dotenv').config();
const Imap = require('imap');
const { simpleParser } = require('mailparser');
const chrono = require('chrono-node')
//const fetch = require("node-fetch");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

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

console.log({
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
});


console.log("IMAP Config:", imapConfig);

// ROUGH code following
const extractEventDetails = (subjectLine, bodyText) => {
    const lowerText = bodyText.toLowerCase();
  
    //filter for women
    if (!lowerText.includes("women") && !lowerText.includes("woman")) {
      return null;
    }

    const event = {
      name: subjectLine || "Untitled Event",
      description: "", //will enter rest
      subject: null,
      dateTime: null,
    };
  
    // subject classification (simple keyword-based)
    for (const s of options) {
      if (lowerText.includes(s.toLowerCase())) {
        event.subject = s;
        break;
      }
    }
  
    // date/time extraction
    const parsedDate = chrono.parseDate(bodyText);
    let dateTime = parsedDate ? parsedDate.toISOString() : null;
    
    let description = "";
    const paragraphs = bodyText.split(/\n\s*\n/); // split on empty lines

  if (paragraphs.length > 0) {
    // remove paragraphs that contain date/time info for description
    description = paragraphs.filter(p => !/\b(on|at)\b/i.test(p)).join('\n').slice(0, 300);
  } else {
    description = bodyText.slice(0, 300);
  }
    event.description = description;
    event.name = event.name.trim();
    event.dateTime = dateTime;
    return event;
  };

const getEmails = () => {
  return new Promise((resolve, reject) => {
    const imap = new Imap(imapConfig);
    const results = [];
    //debugging
    imap.getBoxes((err, boxes) => {
      console.log(JSON.stringify(boxes, null, 2));
    });

    imap.once('ready', () => {
      imap.openBox('INBOX', false, () => {
        //change to UNSEEN
        imap.search(['ALL'], (err, uids) => {
          if (err || !uids || !uids.length) {
            imap.end();
            return resolve([]); // no new emails
          }
          //debugging
          console.log("UIDs found:", uids)

          if (!uids || !uids.length) {
            console.log("No emails found.");
            imap.end();
            return resolve([]);
          }

          const f = imap.fetch(uids, { bodies: '' });

          f.on('message', msg => {
            msg.on('body', stream => {
              simpleParser(stream, async (err, parsed) => {
                if (err) {
                  console.error("Parser error:", err);
                  return reject(err);
                }
                const { from, subject, text } = parsed;
                console.log("Parsed Email:");
                console.log("Subject:", subject);
                console.log("From:", from?.text || from);
                console.log("Text body:", text?.slice(0, 100));

                // check if wstem event
                const parsedEvent = extractEventDetails(subject, text || "");
                if (parsedEvent) {
                  const { name, description, dateTime, subject } = parsedEvent;

  const dateObj = new Date(dateTime);
  const isoDate = dateObj.toISOString().split("T")[0]; // e.g., "2025-05-22"
  const startTime = dateObj.toISOString().split("T")[1].slice(0, 5); // "HH:MM"
  const endTime = new Date(dateObj.getTime() + 60 * 60 * 1000) // 1 hour later
    .toISOString()
    .split("T")[1]
    .slice(0, 5);

  const newTask = {
    title: name,
    description,
    date: isoDate,
    startTime,
    endTime,
    user: 'admin', // TODO
  };

  console.log("Creating task:", newTask);

  await fetch("http://localhost:5000/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTask),
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