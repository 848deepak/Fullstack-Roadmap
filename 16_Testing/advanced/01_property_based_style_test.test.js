const { describe, it, expect } = require('vitest');

function reverseString(value) {
  return [...value].reverse().join('');
}

describe('property-style test', () => {
  it('double reverse returns original for sample values', () => {
    const samples = ['abc', 'racecar', '', 'fullstack'];
    for (const sample of samples) {
      expect(reverseString(reverseString(sample))).toBe(sample);
    }
  });
});
