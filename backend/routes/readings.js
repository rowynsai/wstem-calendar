const express = require('express');
const router = express.Router();
const Reading = require('../models/Reading');
const auth = require('../middleware/auth');

// Create new reading
router.post('/', auth, async (req, res) => {
  try {
    const { cards, question, spreadType } = req.body;

    const reading = new Reading({
      userId: req.userId,
      cards,
      question,
      spreadType
    });

    await reading.save();

    res.status(201).json(reading);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user's readings
router.get('/', auth, async (req, res) => {
  try {
    const readings = await Reading.find({ userId: req.userId })
      .sort({ createdAt: -1 });

    res.json(readings);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single reading
router.get('/:id', auth, async (req, res) => {
  try {
    const reading = await Reading.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!reading) {
      return res.status(404).json({ error: 'Reading not found' });
    }

    res.json(reading);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;