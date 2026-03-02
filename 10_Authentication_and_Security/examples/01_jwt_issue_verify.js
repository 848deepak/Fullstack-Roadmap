const jwt = require('jsonwebtoken');

// Beginner: issue and verify JWT tokens.
// Advanced: keep token expiry short and validate algorithm/issuer in production.
function issueToken(user) {
  return jwt.sign(
    { sub: user.id, role: user.role },
    process.env.JWT_SECRET || 'dev-secret',
    { expiresIn: '15m', issuer: 'fullstack-learning' }
  );
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET || 'dev-secret', {
    issuer: 'fullstack-learning'
  });
}

module.exports = { issueToken, verifyToken };
