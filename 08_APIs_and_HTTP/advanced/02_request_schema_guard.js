// Beginner: validate shape of incoming payload before processing.
// Advanced: explicit schema guards block malformed/unexpected fields early.
function validateCreateUserPayload(payload) {
  if (!payload || typeof payload !== 'object') return { ok: false, message: 'payload required' };

  const { name, email, age } = payload;

  if (typeof name !== 'string' || name.trim().length < 2) {
    return { ok: false, message: 'name must be at least 2 characters' };
  }

  if (typeof email !== 'string' || !email.includes('@')) {
    return { ok: false, message: 'email is invalid' };
  }

  if (age !== undefined && (!Number.isInteger(age) || age < 0 || age > 120)) {
    return { ok: false, message: 'age must be integer between 0 and 120' };
  }

  return { ok: true };
}

module.exports = { validateCreateUserPayload };
