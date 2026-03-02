'use strict';

// Beginner: LRU cache evicts least recently used item when capacity is full.
// Advanced: Map preserves insertion order, enabling O(1) get/set operations.
class LruCache {
  constructor(capacity) {
    if (!Number.isInteger(capacity) || capacity <= 0) {
      throw new Error('capacity must be positive integer');
    }
    this.capacity = capacity;
    this.store = new Map();
  }

  get(key) {
    if (!this.store.has(key)) return undefined;

    const value = this.store.get(key);
    this.store.delete(key);
    this.store.set(key, value);
    return value;
  }

  set(key, value) {
    if (this.store.has(key)) this.store.delete(key);
    this.store.set(key, value);

    if (this.store.size > this.capacity) {
      const oldestKey = this.store.keys().next().value;
      this.store.delete(oldestKey);
    }
  }
}

const cache = new LruCache(2);
cache.set('user:1', { name: 'Asha' });
cache.set('user:2', { name: 'Ravi' });
cache.get('user:1');
cache.set('user:3', { name: 'Neha' });
console.log(cache.get('user:2')); // undefined (evicted)
