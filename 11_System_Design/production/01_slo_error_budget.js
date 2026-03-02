// Beginner: compute remaining error budget from SLO target.
// Advanced: tie deployment decisions to budget consumption.
function calculateErrorBudget({ totalRequests, failedRequests, slo = 0.999 }) {
  const allowedFailures = totalRequests * (1 - slo);
  const remaining = Math.max(0, allowedFailures - failedRequests);
  return { allowedFailures, remaining, exhausted: remaining === 0 };
}

module.exports = { calculateErrorBudget };
