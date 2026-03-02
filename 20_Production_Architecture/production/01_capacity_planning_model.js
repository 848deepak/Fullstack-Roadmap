// Beginner: estimate required instances from QPS and per-instance capacity.
// Advanced: include headroom for p95 spikes and failover scenarios.
function estimateInstances({ qps, capacityPerInstance, headroom = 0.3 }) {
  const base = Math.ceil(qps / capacityPerInstance);
  return Math.ceil(base * (1 + headroom));
}

module.exports = { estimateInstances };
