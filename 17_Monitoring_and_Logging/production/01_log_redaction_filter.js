// Beginner: remove sensitive fields from logs.
// Advanced: mandatory for compliance and incident-safe logging.
function redactSensitive(payload) {
  const clone = { ...payload };
  for (const key of ['password', 'token', 'authorization']) {
    if (clone[key]) clone[key] = '***REDACTED***';
  }
  return clone;
}

module.exports = { redactSensitive };
