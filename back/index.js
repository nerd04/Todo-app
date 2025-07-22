const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());
app.use(cors());

let dataArray = [
  { id: uuidv4(), task: 'Buy groceries', completed: false },
  { id: uuidv4(), task: 'Complete Express.js tutorial', completed: true },
];

// GET all tasks
app.get('/tasks', (req, res) => {
  res.status(200).json(dataArray);
});

// POST (create) a new task
app.post('/tasks', (req, res) => {
  const { task } = req.body;
  const newTask = {
    id: uuidv4(),
    task,
    completed: false,
  };
  dataArray.push(newTask);
  res.status(201).json(newTask);
});

// PUT (update) a task's completion status
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const task = dataArray.find(t => t.id === id);
  if (task) {
    task.completed = completed;
    res.status(200).json(task);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// DELETE a task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  dataArray = dataArray.filter(t => t.id !== id);
  res.status(200).json({ message: 'Task deleted' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
