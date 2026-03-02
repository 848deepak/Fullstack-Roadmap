const { describe, it, expect } = require('vitest');

function isOrderResponse(payload) {
  return payload && typeof payload.id === 'number' && typeof payload.status === 'string';
}

describe('API contract guard', () => {
  it('validates expected order response shape', () => {
    const response = { id: 101, status: 'CREATED', amount: 299 };
    expect(isOrderResponse(response)).toBe(true);
  });
});
