'use strict';

// Beginner: metrics capture request durations and counts.
// Advanced: percentile approximations and labels feed observability backends.
class MetricsCollector {
  constructor() {
    this.counters = new Map();
    this.timings = new Map();
  }

  inc(name, value = 1) {
    this.counters.set(name, (this.counters.get(name) ?? 0) + value);
  }

  observe(name, durationMs) {
    if (!this.timings.has(name)) this.timings.set(name, []);
    this.timings.get(name).push(durationMs);
  }

  snapshot() {
    const timingSummary = {};

    for (const [name, values] of this.timings.entries()) {
      const sorted = [...values].sort((a, b) => a - b);
      const p95Index = Math.max(0, Math.floor(sorted.length * 0.95) - 1);
      timingSummary[name] = {
        count: values.length,
        avg: values.reduce((sum, v) => sum + v, 0) / values.length,
        p95: sorted[p95Index]
      };
    }

    return {
      counters: Object.fromEntries(this.counters),
      timings: timingSummary
    };
  }
}

const metrics = new MetricsCollector();
metrics.inc('http.requests.total');
metrics.observe('http.request.duration.ms', 120);
metrics.observe('http.request.duration.ms', 190);
console.log(metrics.snapshot());
