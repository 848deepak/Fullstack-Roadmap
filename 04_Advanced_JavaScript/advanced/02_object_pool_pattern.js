'use strict';

// Beginner: object pool reuses objects instead of creating new ones repeatedly.
// Advanced: can reduce GC pressure in high-throughput workloads.
class ObjectPool {
  constructor(createFn, resetFn, initialSize = 3) {
    this.createFn = createFn;
    this.resetFn = resetFn;
    this.available = Array.from({ length: initialSize }, () => createFn());
  }

  acquire() {
    return this.available.pop() ?? this.createFn();
  }

  release(obj) {
    this.resetFn(obj);
    this.available.push(obj);
  }
}

const pool = new ObjectPool(
  () => ({ id: null, payload: null }),
  (obj) => {
    obj.id = null;
    obj.payload = null;
  }
);

const item = pool.acquire();
item.id = 'task-1';
item.payload = { ok: true };
pool.release(item);
console.log(pool.acquire());
