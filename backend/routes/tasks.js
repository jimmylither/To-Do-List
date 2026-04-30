const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

// CREATE - Add a new task
router.post('/', (req, res) => {
  const { title, description, priority, dueDate } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const taskData = {
    title,
    description: description || '',
    priority: priority || 'medium',
    dueDate: dueDate || null
  };

  Task.create(taskData, (err, task) => {
    if (err) return res.status(500).json({ error: 'Failed to create task', details: err.message });
    res.status(201).json({ message: 'Task created successfully', task });
  });
});

// READ - Get all tasks
router.get('/', (req, res) => {
  Task.getAll((err, tasks) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch tasks', details: err.message });
    res.status(200).json({ count: tasks.length, tasks });
  });
});

// READ - Get task by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  Task.getById(id, (err, task) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch task', details: err.message });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.status(200).json(task);
  });
});

// READ - Get tasks by status
router.get('/filter/:status', (req, res) => {
  const { status } = req.params;

  Task.getByStatus(status, (err, tasks) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch tasks', details: err.message });
    res.status(200).json({ count: tasks.length, status, tasks });
  });
});

// UPDATE - Update a task
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, priority, status, dueDate } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const taskData = {
    title,
    description: description || '',
    priority: priority || 'medium',
    status: status || 'pending',
    dueDate: dueDate || null
  };

  Task.update(id, taskData, (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to update task', details: err.message });
    res.status(200).json({ message: 'Task updated successfully', id });
  });
});

// DELETE - Delete a task
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Task.delete(id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to delete task', details: err.message });
    res.status(200).json({ message: 'Task deleted successfully', id });
  });
});

module.exports = router;