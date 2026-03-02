const express = require('express');

const app = express();
app.use(express.json());

const users = [
  { id: 1, name: 'Admin User', role: 'admin' },
  { id: 2, name: 'Editor User', role: 'editor' }
];

// Beginner: simple role check middleware.
// Advanced: central authorization guard keeps policy logic consistent.
function authorize(allowedRoles = []) {
  return (req, res, next) => {
    const role = req.headers['x-role'];
    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ code: 'FORBIDDEN', message: 'Insufficient permissions' });
    }
    return next();
  };
}

app.get('/api/v1/users', authorize(['admin', 'editor']), (_req, res) => {
  res.status(200).json(users);
});

app.delete('/api/v1/users/:id', authorize(['admin']), (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((user) => user.id === id);
  if (index < 0) return res.status(404).json({ code: 'USER_NOT_FOUND' });

  users.splice(index, 1);
  return res.status(204).send();
});

module.exports = app;
