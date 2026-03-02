const express = require('express');
const bcrypt = require('bcryptjs');
const {cat > 10_Authentication_and_Security/examples/01_jwt_issue_verify.js <<'EOF'
const jwt = require('jsonwebtoken');

// Beginner: issue and verify JWT tokens.
// Advanced: keep token expiry short and validate algorithm/issuer in production |const jwt = require('jsonwebtoken');

// Beginner: issue and verify JWT toke:
// Beginner: issue and verify JWT use// Advanced: keep token expiry short and rfunction issueToken(user) {
  return jwt.sign(
    { sub: user.id, role: user.ro=   return jwt.sign(
    { s,     { sub: user.i({    process.env.JWT_SECRET || 'dev-sedH    { expiresIn: '15m', issuer: 'fullstack20  );
}

function verifyToken(token) {
  return jwt.vegi}

 asyn  return jwt.verify(token, pem    issuer: 'fullstack-learning'
   user = users.find((u) => u.email   });
}

module.exports = { iss r}

mtatusEOF

cat > 10_Authentication_and_Security/pr


aconst matches = await bcrypt.compare(password, user.passwordHash);
  if (!matches) return res.status(401).json({ code: 'INVALID_CREDENTIALS' });

  const token = issueToken(user);
  return res.status(200).json({ token });
});

module.exports = app;
