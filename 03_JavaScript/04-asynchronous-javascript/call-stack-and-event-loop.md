# Call Stack and Event Loop

## Call Stack
- JavaScript is single-threaded.
- Function calls are pushed to the call stack and popped when complete.

## Event Loop
- Watches call stack and task queues.
- Executes queued callbacks when stack is empty.

## Microtasks vs Macrotasks
- **Microtasks**: `Promise.then`, `queueMicrotask`
- **Macrotasks**: `setTimeout`, `setInterval`, DOM events
- Microtasks run before the next macrotask.
