'use strict';

// Beginner: event bus enables pub/sub between independent modules.
// Advanced: unsubscribe is critical to avoid memory leaks in long-lived apps.
class EventBus {
  constructor() {
    this.handlers = new Map();
  }

  on(eventName, handler) {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, new Set());
    }

    const eventHandlers = this.handlers.get(eventName);
    eventHandlers.add(handler);

    return () => eventHandlers.delete(handler);
  }

  emit(eventName, payload) {
    const eventHandlers = this.handlers.get(eventName);
    if (!eventHandlers) return;
    for (const handler of eventHandlers) handler(payload);
  }
}

const bus = new EventBus();
const unsubscribe = bus.on('order.created', (payload) => console.log(payload));
bus.emit('order.created', { id: 'ord-101' });
unsubscribe();
bus.emit('order.created', { id: 'ord-102' });
