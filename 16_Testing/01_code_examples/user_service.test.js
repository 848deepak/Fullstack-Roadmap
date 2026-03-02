const { describe, it, expect } = require('vitest');

// Beginner: Unit test validates small behavior.
// Advanced: deterministic tests improve CI reliability and confidence.
function fullName(user) {
  return `${user.firstName} ${user.lastName}`.trim();
}

describe('fullName', () => {
  it('returns full name', () => {
    expect(fullName({ firstName: 'Deepak', lastName: 'Pandey' })).toBe('Deepak Pandey');
  });
});
