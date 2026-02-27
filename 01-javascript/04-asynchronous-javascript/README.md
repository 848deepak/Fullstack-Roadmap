# Asynchronous JavaScript

## Overview
This module explains non-blocking JavaScript execution and modern async patterns used in production apps.

## What You Learn
- Callbacks and callback hell
- Promises and chaining
- `async/await` with `try/catch`
- Fetch API basics
- Event loop mental model
- Microtasks vs macrotasks

## Files and Purpose
- `00-reference.md` — quick async revision guide
- `01-callbacks.js` — callback-based async flow
- `02-promises.js` — Promise creation and consumption
- `03-async-await.js` — readable async logic
- `04-fetch-api.js` — real HTTP request flow
- `05-callback-hell.js` — nested callback anti-pattern
- `06-event-loop-micro-macro.js` — queue ordering demonstration
- `call-stack-and-event-loop.md` — theory notes

## How to Run
```bash
node 02-promises.js
node 03-async-await.js
node 06-event-loop-micro-macro.js
```

## Practice Tasks
1. Convert callback hell example to Promise chaining.
2. Add error retries for `fetch` with max attempts.
3. Print timestamps to understand event loop behavior.

## Expected Outcome
You should be able to write robust async code and reason about JS execution order.
