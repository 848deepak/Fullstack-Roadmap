// Beginner: open circuit after repeated failures.
// Advanced: prevents c// Advanced: prevents c// Advanced: prevents c// Advanced: prevents c// Advanced: prevents c// Advanced: prevents c// Advanced: prevents c// Advanced: prevents c// Advanced: prevents c// Advanced: prevents c// Advanced: prevents c// Advanced: prevents c// Advanced: prevents c// Advanced: prevents c// Advanced: prevents c// Advanced: prevents c// Advanclur// Advanced: prevents c// Advanced: prevents c// Advanced: prevents c// Advanced: prevents c// Advanced: prevents c// Advanced: prevents c// Advanced: prevents c// Advanced: prevents c// Advanced: prevents c// Advanced: prevents c// Advanced: prevents c// Advanced: prevents c// Advanced: prevents c// Advanced: prevents c// Advanced: prevents c// Advanced: prevents c// Advanclur// Advanced: prevents c// Advanced: prevents c// Advanced: prevents c// Advanced: prevents c// Advanced: prevents c// Advanced: prevents c// (1 - slo);
  const remaining = Math.max(0, allowedFailures - failedRequests);
  return { allowedFailures, remaining, exhausted: remaining === 0 };
}

module.exports = { calculateErrorBudget };
