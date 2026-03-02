const express = require('express');

const app = express();
app.use(express.json());

// Beginner: in-memory collection to understand CRUD route behavior.
// Advanced: keep route shape resource-oriented for future DB migration.
const books = [
  { id: 1, title: 'Distributed Systems', author: 'A. Tanenbaum' }
];

app.get('/api/v1/books', (_req, res) => {
  res.status(200).json(books);
});

app.post('/api/v1/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ code: 'VALIDATION_ERROR', message: 'title and author are required' });
  }

  const book = { id: books.length + 1, title: title.trim(), author: author.trim() };
  books.push(book);
  return res.status(201).json(book);
});

module.exports = app;
