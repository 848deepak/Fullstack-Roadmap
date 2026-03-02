const crypto = require('crypto');

// Beginner: generate and validate OAuth state parameter.
// Advanced: prevents CSRF during OAuth redirect flow.
function createState() {
  return crypto.randomBytes(24).toString('hex');
}

function validateState(expected, received) {
  return typeof expected === 'string' && expected.length > 0 && expected === received;
}

module.exports = { createState, validateState };
