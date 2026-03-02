'use strict';

// Beginner: retries help with transient network failures.
// Advanced: exponential backoff prevents retry storms under partial outages.
async function withRetry(task, options = {}) {
  const maxAttempts = options.maxAttempts ?? 3;
  const baseDelayMs = options.baseDelayMs ?? 200;

  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      return await task();
    } catch (error) {
      lastError = error;
      const isLastAttempt = attempt === maxAttempts;
      if (isLastAttempt) break;

      const jitter = Math.floor(Math.random() * 50);
      const backoff = baseDelayMs * 2 ** (attempt - 1) + jitter;
      await new Promise((resolve) => setTimeout(resolve, backoff));
    }
  }

  throw lastError;
}

let callCount = 0;
async function unstableOperation() {
  callCount += 1;
  if (callCount < 3) throw new Error('Temporary failure');
  return { ok: true, attempt: callCount };
}

withRetry(unstableOperation, { maxAttempts: 4 })
  .then((result) => console.log('success:', result))
  .catch((error) => console.error('failed:', error.message));
