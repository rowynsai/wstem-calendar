const express = require('express');
const router = express.Router();
const DailyCard = require('../models/DailyCard');
const auth = require('../middleware/auth');

// Get or create today's card
router.get('/today', auth, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let dailyCard = await DailyCard.findOne({
      userId: req.userId,
      date: { $gte: today }
    });

    if (dailyCard) {
      return res.json(dailyCard);
    }

    // If no card for today, return null (frontend will trigger draw)
    res.json(null);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Draw daily card
router.post('/draw', auth, async (req, res) => {
  try {
    const { cardId, cardName, reversed } = req.body;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if already drawn today
    const existingCard = await DailyCard.findOne({
      userId: req.userId,
      date: { $gte: today }
    });

    if (existingCard) {
      return res.status(400).json({ 
        error: 'Daily card already drawn for today' 
      });
    }

    const dailyCard = new DailyCard({
      userId: req.userId,
      cardId,
      cardName,
      reversed,
      date: today
    });

    await dailyCard.save();

    res.status(201).json(dailyCard);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;