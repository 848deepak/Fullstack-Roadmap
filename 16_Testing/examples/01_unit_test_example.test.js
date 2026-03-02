const { describe, it, expect } = require('vitest');

function add(a, b) {
  return a + b;
}

describe('add', () => {
  it('adds numbers', () => {
    expect(add(2, 3)).toBe(5);
  });
});
