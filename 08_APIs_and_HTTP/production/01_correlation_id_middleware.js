const crypto = require('crypto');

// Beginner: attach request ID so each request is traceable.
// Advanced: propagate correlation ID across service calls and logs.
function correlationIdMiddleware(req, res, next) {
  const incoming = req.headers['x-correlation-id'];
  const correlationId = typeof incoming === 'string' && incoming.trim().length > 0
    ? incoming
    : crypto.randomUUID();

  req.correlationId = correlationId;
  res.setHeader('x-correlation-id', correlationId);
  return next();
}

module.exports = { correlationIdMiddleware };
