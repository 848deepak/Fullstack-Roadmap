// Beginner: wraps fetch with timeout and controlled retries.
// Advanced: retry only transient failures and preserve caller context.
async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function callDownstream(url, options = {}) {
  const {
    retries = 2,
    timeoutMs = 2000,
    retryStatusCodes = [408, 429, 500, 502, 503, 504],
    ...fetchOptions
  } = options;

  let lastError;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, { ...fetchOptions, signal: controller.signal });
      clearTimeout(timeoutId);

      if (!retryStatusCodes.includes(response.status) || attempt === retries) {
        return response;
      }
    } catch (error) {
      clearTimeout(timeoutId);
      lastError = error;
      if (attempt === retries) throw error;
    }

    await sleep((attempt + 1) * 150);
  }

  throw lastError;
}

module.exports = { callDownstream };
