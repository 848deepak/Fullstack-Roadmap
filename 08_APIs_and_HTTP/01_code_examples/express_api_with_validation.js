const express = require('express');

const app = express();
app.use(express.json());

// Beginner: Store data in memory while learning API basics.
// Advanced: Replace with persistent database + schema validation for production.
const users = [];

app.post('/api/v1/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ code: 'VALIDATION_ERROR', message: 'name and email are required' });
  }

  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  return res.status(201).json(newUser);
});

app.get('/api/v1/users', (_req, res) => res.status(200).json(users));

module.exports = app;
