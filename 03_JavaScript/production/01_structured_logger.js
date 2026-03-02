'use strict';

// Beginner: structured logs use JSON so tools can parse them reliably.
// Advanced: include correlation/request ID for distributed tracing.
function createLogger(serviceName) {
  function log(level, message, metadata = {}) {
    const entry = {
      timestamp: new Date().toISOString(),
      level,
      service: serviceName,
      message,
      ...metadata
    };

    console.log(JSON.stringify(entry));
  }

  return {
    info: (message, metadata) => log('INFO', message, metadata),
    warn: (message, metadata) => log('WARN', message, metadata),
    error: (message, metadata) => log('ERROR', message, metadata)
  };
}

const logger = createLogger('order-api');
logger.info('Order created', { requestId: 'req-123', orderId: 'ord-889' });
