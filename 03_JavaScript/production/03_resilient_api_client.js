'use strict';

// Real-world production utility: resilient fetch wrapper.
// Beginner: wraps fetch with timeout and basic retry.
// Advanced: includes retry policy for transient status codes and network errors.
async function resilientFetch(url, options = {}) {
  const {
    timeoutMs = 3000,
    retries = 2,
    retryStatusCodes = [408, 429, 500, 502, 503, 504],
    ...fetchOptions
  } = options;

  let lastError;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, { ...fetchOptions, signal: controller.signal });

      if (!retryStatusCodes.includes(response.status) || attempt === retries) {
        return response;
      }

      await new Promise((resolve) => setTimeout(resolve, 150 * (attempt + 1)));
    } catch (error) {
      lastError = error;
      if (attempt === retries) throw error;
      await new Promise((resolve) => setTimeout(resolve, 150 * (attempt + 1)));
    } finally {
      clearTimeout(timer);
    }
  }

  throw lastError;
}

resilientFetch('https://jsonplaceholder.typicode.com/todos/1', { retries: 1 })
  .then(async (response) => {
    console.log('status:', response.status);
    console.log('body:', await response.json());
  })
  .catch((error) => console.error('request failed:', error.message));
