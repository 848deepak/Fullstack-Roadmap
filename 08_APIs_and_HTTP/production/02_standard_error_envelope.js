// Beginner: keep all API errors in one consistent JSON format.
// Advanced: stable envelopes reduce brittle client-side error parsing.
function buildErrorResponse({ status, code, message, path, traceId }) {
  return {
    timestamp: new Date().toISOString(),
    status,
    code,
    message,
    path,
    traceId
  };
}

function errorHandler(err, req, res, _next) {
  const status = err.status || 500;
  const payload = buildErrorResponse({
    status,
    code: err.code || 'INTERNAL_ERROR',
    message: err.message || 'Unexpected server error',
    path: req.originalUrl,
    traceId: req.correlationId || 'unknown'
  });

  res.status(status).json(payload);
}

module.exports = { buildErrorResponse, errorHandler };
