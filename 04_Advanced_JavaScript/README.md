# Module 04: Advanced JavaScript

## 1. Concept Overview
Advanced JavaScript moves beyond basic syntax and DOM manipulation into the structural design paradigms, memory management, deep asynchronous flows, and meta-programming that power modern complex web applications and libraries.

## 2. Theory from Scratch
- **Prototypal Inheritance:** Objects can inherit properties directly from other objects via the prototype chain (`__proto__`), entirely bypassing class structures. (ES6 `class` is just syntactic sugar over prototypes).
- **Asynchronous JavaScript:** 
  - **Callbacks:** Functions passed to a higher-order function to be executed later (leads to callback hell).
  - **Promises:** Objects representing the eventual completion/failure of an async operation.
  - **Async/Await:** Syntactic sugar allowing asynchronous code to be written in a synchronous, readable format.
- **Design Patterns:** Creational (Singleton, Factory), Structural (Decorator, Facade), and Behavioral (Observer, Pub/Sub).
- **Functional Programming (FP):** Treating functions as first-class citizens. Key concepts: Pure functions, immutability, currying, and higher-order functions (`map`, `filter`, `reduce`).

## 3. Internal Working (Under the Hood)
### The V8 Engine Pipeline
1. **Parser:** Converts JS text into an Abstract Syntax Tree (AST).
2. **Ignition (Interpreter):** Converts AST into unoptimized bytecode and runs it immediately.
3. **TurboFan (Compiler):** An optimizing compiler. When Ignition notices a function is "hot" (called repeatedly), TurboFan compiles it into highly optimized machine code. If assumptions change (e.g., passing a String instead of an Int to a function), TurboFan "de-optimizes" back to bytecode.

### Memory Lifecycle
JavaScript is garbage collected (GC). The GC uses a **Mark-and-Sweep** algorithm:
- It starts at the "roots" (global object like `window`).
- It traverses references to find "reachable" objects.
- Any object in the heap that is unreachable is considered garbage and its memory is freed.

## 4. Why it is used in Production
Production applications handle millions of data points and complex user interactions. Without advanced paradigms (like the Observer pattern or Pub/Sub), spaghetti code ensues. Understanding TurboFan optimization allows engineers to write "monomorphic" code that executes 10x-100x faster in Node.js backends.

## 5. Architecture Diagrams

**The Promise Lifecycle:**
```text
                  +-------------------+
                  |      Pending      |
                  |  (Initial state)  |
                  +---------+---------+
                            |
            +---------------+---------------+
            |                               |
    [resolve(value)]               [reject(error)]
            |                               |
            v                               v
  +-------------------+           +-------------------+
  |     Fulfilled     |           |     Rejected      |
  |     .then()       |           |     .catch()      |
  +-------------------+           +-------------------+
            \                               /
             \                             /
              v                           v
             +-----------------------------+
             |         .finally()          |
             +-----------------------------+
```

## 6. Performance Considerations
- **Memory Leaks:** 
  - *Closures:* Holding onto heavy objects in closures that never die.
  - *Event Listeners:* Failing to `removeEventListener` when a component unmounts (a huge issue in SPAs).
- **Microtasks vs Macrotasks:** `Promise.then()` goes to the Microtask Queue. `setTimeout()` goes to the Macrotask Queue. The Event Loop empties the *entire* Microtask queue before executing a *single* Macrotask. An infinite loop of Promises will freeze the browser.

## 7. Security Considerations
- **Prototype Pollution:** Modifying `Object.prototype` natively or via a third-party library payload. This can break code globally or allow attackers to bypass authorization checks.

## 8. Common Mistakes
- **Mutating the Prototype Chain:** Doing `Array.prototype.myCustomMap = ...` in production will clash with other libraries or future ES syntax.
- **Forgetting `await`:** Calling `const data = fetch('/api')` instead of `await fetch`. The variable `data` holds a `Promise<Pending>`, not the response JSON, leading to silent bugs.
- **Shadowing Variables:** Accidentally declaring `const name` inside a block that hides the `name` variable from the outer scope, leading to unexpected data manipulation.

## 9. Interview Questions
1. **Q:** What is the difference between `bind`, `call`, and `apply`?
   **A:** All three explicitly set the `this` context representing an object. `call(obj, arg1, arg2)` executes immediately. `apply(obj, [arg1, arg2])` executes immediately but takes an array of arguments. `bind` returns a *new* function instance with `this` permanently set, to be executed later.
2. **Q:** Explain Debouncing vs Throttling.
   **A:** **Debounce:** Fire the function only after a pause of X milliseconds (good for search inputs). **Throttle:** Fire the function only once every X milliseconds (good for scroll/resize events).
3. **Q:** What is Currying?
   **A:** Transforming a function that takes multiple arguments `f(a, b, c)` into a sequence of functions that each take a single argument `f(a)(b)(c)`.

## 10. Production-Level Best Practices
- **Immutable State Updates:** Never mutate objects directly. Always return a new object (e.g., `return { ...state, key: newValue }`) to prevent subtle reference bugs.
- **Error Boundaries:** Always wrap `await` blocks in `try/catch`, or use a wrapper function that returns `[error, data]` to handle rejections gracefully without crashing the app.
- **Module Bundling:** Use Webpack, Vite, or Rollup to strictly sandbox modules and perform Dead Code Elimination (Tree Shaking) on unused exports.
