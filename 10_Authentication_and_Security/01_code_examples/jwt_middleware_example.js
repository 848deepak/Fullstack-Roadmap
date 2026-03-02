const jwt = require('jsonwebtoken');

// Beginner: This middleware checks if request token is valid.
// Advanced: Enforce issuer/audience and use key rotation in production.
function authGuard(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) return res.status(401).json({ code: 'UNAUTHORIZED', message: 'Missing token' });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    return next();
  } catch {
    return res.status(401).json({ code: 'UNAUTHORIZED', message: 'Invalid token' });
  }
}

module.exports = { authGuard };
