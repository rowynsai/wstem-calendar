const express = require('express');
const Task = require('../models/Task');
const router = express.Router();
const { createCalendarEvent } = require('../google/googleUtils'); // TODO path

// Create Task
router.post('/', async (req, res) => {
  try {
    const { title, description, date, startTime, endTime, user, subject } = req.body;

    // ensure all fields (except opt description) present
    if (!title || !date || !startTime || !endTime || !user) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const task = new Task({
      title,
      description,
      date,
      startTime,
      endTime,
      user,
      subject,
    });

    await task.save();

    // create gc event
    let calendarEvent;
    try {
      calendarEvent = await createCalendarEvent({
        title,
        description,
        date,
        startTime,
        endTime,
        subject,
      });
    } catch (calendarError) {
      console.error('Google Calendar event creation failed:', calendarError);
      // TODO
      return res.status(201).json({
        task,
        warning: 'Task saved but failed to create calendar event',
      });
    }

    res.status(201).json({ task, calendarEvent });
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
});

// Get User's Events
router.get('/:userId', async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.params.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
});

// Update Task
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
});

// Delete Task
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
});

module.exports = router;
