'use strict';

// Production utility: graceful shutdown sequence manager.
// Beginner: execute cleanup handlers when process receives termination signal.
// Advanced: bounded shutdown time avoids hanging deployments.
function createShutdownOrchestrator({ timeoutMs = 5000 } = {}) {
  const handlers = [];
  let shuttingDown = false;

  function register(handler) {
    if (typeof handler !== 'function') throw new Error('handler must be function');
    handlers.push(handler);
  }

  async function shutdown(signal = 'SIGTERM') {
    if (shuttingDown) return;
    shuttingDown = true;

    const timer = setTimeout(() => {
      console.error(`Forced exit after timeout (${timeoutMs}ms)`);
      process.exit(1);
    }, timeoutMs);

    try {
      for (const handler of handlers) {
        await handler(signal);
      }
      clearTimeout(timer);
      process.exit(0);
    } catch (error) {
      clearTimeout(timer);
      console.error('Shutdown failed:', error.message);
      process.exit(1);
    }
  }

  return { register, shutdown };
}

const orchestrator = createShutdownOrchestrator({ timeoutMs: 3000 });
orchestrator.register(async () => {
  await new Promise((resolve) => setTimeout(resolve, 150));
  console.log('Closed database connections');
});
orchestrator.register(async () => {
  await new Promise((resolve) => setTimeout(resolve, 120));
  console.log('Flushed logs');
});

if (process.env.DEMO_SHUTDOWN === 'true') {
  process.on('SIGTERM', () => orchestrator.shutdown('SIGTERM'));
}
