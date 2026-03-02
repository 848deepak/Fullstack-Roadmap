// Beginner: cache API responses to avoid refetching same data.
// Advanced: TTL-based invalidation avoids stale data living forever.
const queryCache = new Map();

export async function fetchWithTtlCache(key, fetcher, ttlMs = 5000) {
  const now = Date.now();
  const cached = queryCache.get(key);

  if (cached && cached.expiresAt > now) {
    return cached.value;
  }

  const value = await fetcher();
  queryCache.set(key, { value, expiresAt: now + ttlMs });
  return value;
}

export function invalidateCache(key) {
  queryCache.delete(key);
}
