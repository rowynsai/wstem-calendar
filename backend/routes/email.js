const express = require('express');
const router = express.Router();
const { getEmails } = require('../emailReader');

router.post('/scan', async (req, res) => {
  try {
    await getEmails();
    res.json({ message: 'Scanned inbox and created events.' });
  } catch (err) {
    console.error('Email scan failed:', err);
    res.status(500).json({ error: 'Failed to scan inbox.' });
  }
});

router.get('/scan', async (req, res) => {
  try {
    const events = await getEmails();
    res.json({
      message: 'Scanned inbox and created events.',
      events, // shows event deets
    });
  } catch (err) {
    console.error('Email scan failed:', err);
    res.status(500).json({ error: 'Failed to scan inbox.' });
  }
});


module.exports = router;