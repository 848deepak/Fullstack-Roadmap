'use strict';

// Mini Project: simple task tracker in memory.
// Beginner: demonstrates CRUD operations with arrays.
// Advanced: methods are designed to be later swapped with DB persistence.
class TaskTracker {
  constructor() {
    this.tasks = [];
    this.nextId = 1;
  }

  addTask(title) {
    if (!title || title.trim().length < 3) {
      throw new Error('Title must be at least 3 characters');
    }

    const task = {
      id: this.nextId,
      title: title.trim(),
      done: false,
      createdAt: new Date().toISOString()
    };

    this.tasks.push(task);
    this.nextId += 1;
    return task;
  }

  markDone(taskId) {
    const task = this.tasks.find((item) => item.id === taskId);
    if (!task) throw new Error(`Task ${taskId} not found`);
    task.done = true;
    return task;
  }

  list(filter = 'all') {
    if (filter === 'done') return this.tasks.filter((task) => task.done);
    if (filter === 'pending') return this.tasks.filter((task) => !task.done);
    return [...this.tasks];
  }
}

const tracker = new TaskTracker();
tracker.addTask('Study event loop');
tracker.addTask('Build retry utility');
tracker.markDone(1);

console.log('all:', tracker.list());
console.log('pending:', tracker.list('pending'));
