const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// create Task
router.post('/', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.json(task)
});

// get User's Task
router.get('/:userId', async (req, res) => {
    const task = await Task.find({ user: req.params.userId });
    res.json(tasks);
});

// update Task
router.put('/:id', async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true});
    res.json(task);
});

// delete User's Task
router.delete('/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.userId);
    res.json({ message: 'Task deleted' });
});


module.exports = router;