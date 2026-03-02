'use strict';

// Mini Project: in-memory priority task scheduler.
// Beginner: tasks execute by priority order.
// Advanced: supports async tasks and isolates failures per task.
class TaskScheduler {
  constructor() {
    this.queue = [];
  }

  addTask(name, handler, priority = 5) {
    if (typeof handler !== 'function') throw new Error('handler must be function');
    this.queue.push({ name, handler, priority, createdAt: Date.now() });
    this.queue.sort((a, b) => a.priority - b.priority || a.createdAt - b.createdAt);
  }

  async runAll() {
    const results = [];

    while (this.queue.length > 0) {
      const task = this.queue.shift();
      try {
        const value = await task.handler();
        results.push({ name: task.name, ok: true, value });
      } catch (error) {
        results.push({ name: task.name, ok: false, error: error.message });
      }
    }

    return results;
  }
}

const scheduler = new TaskScheduler();
scheduler.addTask('critical-db-sync', async () => 'synced', 1);
scheduler.addTask('report-generation', async () => 'report-ready', 3);
scheduler.addTask('cleanup', async () => { throw new Error('cleanup failed'); }, 4);

scheduler.runAll().then((data) => console.log(data));
