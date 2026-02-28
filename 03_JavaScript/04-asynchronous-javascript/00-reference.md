# 00 — Async JavaScript Quick Reference

## Core Terms
- **Callback**: Function passed to another function.
- **Promise**: Represents eventual completion/failure of async work.
- **async/await**: Cleaner Promise syntax.
- **Event Loop**: Manages async task execution.
- **Microtask vs Macrotask**: Promises run before timers.

## When to Use
- API calls, timers, file/network operations.

## Key Patterns
- Prefer `async/await` with `try/catch`.
- Keep async functions small and predictable.
- Handle loading/error/success states.
