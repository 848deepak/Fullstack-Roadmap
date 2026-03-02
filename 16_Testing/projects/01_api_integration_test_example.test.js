const { describe, it, expect } = require('vitest');

async function fakeFetchUser() {
  return { id: 1, name: 'Deepak' };
}

describe('API integration example', () => {
  it('returns user payload', async () => {
    const user = await fakeFetchUser();
    expect(user).toEqual({ id: 1, name: 'Deepak' });
  });
});
