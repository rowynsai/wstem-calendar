const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// create Task
router.post('/', async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error: error.message });
    }
});

// get User's Task
router.get('/:userId', async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.params.userId });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error: error.message });
    }
});

// update Task
router.put('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error: error.message });
    }
});

// delete User's Task
router.delete('/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error: error.message });
    }
});


module.exports = router;