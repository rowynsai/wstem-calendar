require('dotenv').config();
const Imap = require('imap');
const { simpleParser } = require('mailparser');
const chrono = require('chrono-node')
//const fetch = require("node-fetch");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const options = ["Math", "CPSC", "Chem", "Biol", "Phys", "APSC"];
const keywords = [
  "women", "women in stem", "stem for women", "female engineers", "women in science",
  "diversity in tech", "diversity", "gender minority", "women tech", "wim", "wics"
];
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

//get link
const extractLink = (text) => {
  const urls = text.match(/https?:\/\/[^\s)]+/g);
  return urls ? urls[0] : null;
};

//get location
const extractLocation = (text) => {
  const locationRegex = /(Location|Where|Venue)[:\-]?\s*(.+)/i;
  const match = text.match(locationRegex);
  return match ? match[2].split('\n')[0].trim() : null;
};


// get event details
const extractEventDetails = (subjectLine, bodyText) => {
    const lowerText = bodyText.toLowerCase();

    //filter for keywords
    if (!keywords.some(k => lowerText.includes(k))) return null;


    const event = {
      name: subjectLine?.trim() || "Untitled Event",
      description: "",
      dateTime: null,
      endTime: null,
      link: extractLink(bodyText),
      location: extractLocation(bodyText)
    };
  
    // subject classification (simple keyword-based)
    for (const s of options) {
      const regex = new RegExp(`\\b${s}\\b`, 'i');
      if (regex.test(bodyText)) {
        event.subject = s;
        break;
      }
    }
    
    // get date and time
    const parsedDateResults = chrono.parse(bodyText);
    if (parsedDateResults.length > 0) {
      const { start, end } = parsedDateResults[0];
      event.dateTime = start.date().toISOString();
      if (end) event.endTime = end.date().toISOString();
    }
  
    //get desciption (no times)
    const paragraphs = bodyText.split(/\n\s*\n/);
    const filteredParagraphs = paragraphs.filter(p => {
      const dateMatch = chrono.parse(p);
      return dateMatch.length === 0;
    });
    event.description = filteredParagraphs.join('\n').slice(0, 500);
  
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
    const emailProcessingPromises = [];

    imap.once('ready', () => {
      imap.openBox('INBOX', false, () => {
        //change to UNSEEN TODO
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
              const p = simpleParser(stream)
                .then(async parsed => {
                  const { from, subject, text } = parsed;
                  console.log("Parsed Email:", subject);

                  const parsedEvent = extractEventDetails(subject, text || "");
                  if (parsedEvent) {
                    const { name, description, dateTime, subject: subjectTag } = parsedEvent;


                    const dateObj = new Date(dateTime);
                    const isoDate = dateObj.toISOString().split("T")[0];
                    const startTime = dateObj.toISOString().split("T")[1].slice(0, 5);
                    const endTime = new Date(dateObj.getTime() + 60 * 60 * 1000)
                      .toISOString()
                      .split("T")[1]
                      .slice(0, 5);

                    const newTask = {
                      title: name,
                      description,
                      date: isoDate,
                      startTime,
                      endTime,
                      user: "63a1f1a45b3e8c35f2a9d8e1",
                    };

                    console.log("Creating task:", newTask);
                    const response = await fetch("http://localhost:5000/api/tasks", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(newTask),
                    });

                    if (response.ok) {
                      results.push(newTask);
                    } else {
                      console.error("Failed to save task:", await response.text());
                    }
                  }
                })
                .catch(err => console.error("Parsing error:", err));

              emailProcessingPromises.push(p);
            });

            msg.once('attributes', attrs => {
              imap.addFlags(attrs.uid, ['\\Seen'], () => {
                console.log('Marked as read');
              });
            });
          });

          f.once('end', async () => {
            await Promise.all(emailProcessingPromises); // wait for all messages to finish
            imap.end();
            resolve(results);
          });

          f.once('error', err => {
            console.error("Fetch error:", err);
            reject(err);
          });
        });
      });
    });

    imap.once('error', err => {
      console.error("IMAP error:", err);
      reject(err);
    });

    imap.connect();
  });
};

module.exports = { getEmails };