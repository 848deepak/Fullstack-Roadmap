const express = require('express');

const app = express();
app.use(express.json());

// Mini project: orders API core.
// Beginner: demonstrates REST create/read/update/delete flow.
// Advanced: includes idempotency key handling for safe retries.
const orders = [];
const idempotencyStore = new Map();

app.post('/api/v1/orders', (req, res) => {
  const idempotencyKey = req.headers['idempotency-key'];
  if (!idempotencyKey) {
    return res.status(400).json({ code: 'MISSING_IDEMPOTENCY_KEY' });
  }

  if (idempotencyStore.has(idempotencyKey)) {
    return res.status(200).json(idempotencyStore.get(idempotencyKey));
  }

  const { userId, amount } = req.body;
  if (!userId || !Number.isFinite(amount) || amount <= 0) {
    return res.status(422).json({ code: 'VALIDATION_ERROR', message: 'Invalid order payload' });
  }

  const order = { id: orders.length + 1, userId, amount, status: 'CREATED' };
  orders.push(order);
  idempotencyStore.set(idempotencyKey, order);
  return res.status(201).json(order);
});

app.get('/api/v1/orders/:id', (req, res) => {
  const order = orders.find((item) => item.id === Number(req.params.id));
  if (!order) return res.status(404).json({ code: 'ORDER_NOT_FOUND' });
  return res.status(200).json(order);
});

module.exports = app;
