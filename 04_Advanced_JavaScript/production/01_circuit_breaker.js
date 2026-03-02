'use strict';

// Production pattern: circuit breaker for unstable downstream services.
// Beginner: opens after repeated failures and blocks calls temporarily.
// Advanced: reduces cascading failures and improves system recovery behavior.
class CircuitBreaker {
  constructor(action, options = {}) {
    this.action = action;
    this.failureThreshold = options.failureThreshold ?? 3;
    this.cooldownMs = options.cooldownMs ?? 2000;
    this.failureCount = 0;
    this.state = 'CLOSED';
    this.nextTryAt = 0;
  }

  async execute(...args) {
    const now = Date.now();

    if (this.state === 'OPEN' && now < this.nextTryAt) {
      throw new Error('Circuit is OPEN');
    }

    if (this.state === 'OPEN' && now >= this.nextTryAt) {
      this.state = 'HALF_OPEN';
    }

    try {
      const result = await this.action(...args);
      this.failureCount = 0;
      this.state = 'CLOSED';
      return result;
    } catch (error) {
      this.failureCount += 1;
      if (this.failureCount >= this.failureThreshold) {
        this.state = 'OPEN';
        this.nextTryAt = Date.now() + this.cooldownMs;
      }
      throw error;
    }
  }
}

let unstableCallCount = 0;
const unstableService = async () => {
  unstableCallCount += 1;
  if (unstableCallCount < 4) throw new Error('downstream error');
  return 'ok';
};

const breaker = new CircuitBreaker(unstableService, { failureThreshold: 2, cooldownMs: 500 });
breaker.execute().catch((e) => console.log(e.message));
breaker.execute().catch((e) => console.log(e.message));
setTimeout(() => breaker.execute().then(console.log).catch((e) => console.log(e.message)), 700);
