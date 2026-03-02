// Beginner: token bucket allows burst traffic then refills over time.
// Advanced: production implementations should use shared storage (Redis) for multi-instance apps.
class TokenBucketLimiter {
  constructor(capacity, refillPerSecond) {
    this.capacity = capacity;
    this.refillPerSecond = refillPerSecond;
    this.buckets = new Map();
  }

  isAllowed(key) {
    const now = Date.now();
    const bucket = this.buckets.get(key) ?? {
      tokens: this.capacity,
      lastRefillAt: now
    };

    const elapsedSeconds = (now - bucket.lastRefillAt) / 1000;
    bucket.tokens = Math.min(this.capacity, bucket.tokens + elapsedSeconds * this.refillPerSecond);
    bucket.lastRefillAt = now;

    if (bucket.tokens < 1) {
      this.buckets.set(key, bucket);
      return false;
    }

    bucket.tokens -= 1;
    this.buckets.set(key, bucket);
    return true;
  }
}

module.exports = { TokenBucketLimiter };
