const express = require('express');
const router = express.Router();
const { getEmails } = require('../emailReader');

router.get('/read-emails', async (req, res) => {
    try {
      const emails = await getEmails();
      res.json({ emails });
    } catch (err) {
      console.error('Error reading emails:', err);
      res.status(500).json({ error: 'Failed to read emails', details: err.message });
    }
  });
  

module.exports = router;