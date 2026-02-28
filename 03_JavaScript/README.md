# Module 03: JavaScript Fundamentals

## 1. Concept Overview
JavaScript is the ubiquitous scripting language of the web. While initially created for simple DOM manipulation, it has evolved into a powerful, multi-paradigm, asynchronous language running both in the browser and on servers (Node.js).

## 2. Theory from Scratch
- **Variables & Scopes:** `var` (function scope) vs `let`/`const` (block scope). 
- **Data Types:** Primitives (String, Number, Boolean, Undefined, Null, Symbol, BigInt) vs References (Objects, Arrays, Functions).
- **Functions:** Declarations, Expressions, Arrow Functions (`() => {}`), and execution contexts.
- **The DOM:** The Document Object Model is a hierarchical tree representing the HTML page, allowing JS to read and mutate it.

## 3. Internal Working (Under the Hood)
JavaScript is a single-threaded, non-blocking, synchronous, concurrent language.

```text
+-------------------------------------------------------+
|                    V8 Engine (Chrome/Node)            |
|                                                       |
|  +---------------+       +-------------------------+  |
|  |  Memory Heap  |       |       Call Stack        |  |
|  |  (Objects)    |       |  (Execution Contexts)   |  |
|  +---------------+       +-----------|-------------+  |
|                                      |                |
+--------------------------------------|----------------+
                                       | (Async Code)
+-------------------+      +-----------v-------------+
|    Event Loop     |<-----|   Web APIs (Browser)    |
+---------^---------+      |   (setTimeout, DOM)     |
          |                +-------------------------+
+---------|---------+                  |
|  Callback Queue   |<-----------------+ 
+-------------------+
```
*When an async function is called, it's handed to the Web APIs. Once finished, its callback is pushed to the Callback Queue. The Event Loop constantly checks if the Call Stack is empty; if so, it pushes the first callback from the queue to the stack.*

## 4. Why it is used in Production
JavaScript enables **Dynamic Client-Side Rendering**, allowing applications to update data without full page reloads (SPA functionality). It also enables sharing logic between frontend and backend via Node.js, standardizing the tech stack.

## 5. Performance Considerations
- **DOM Reflows/Repaints:** Modifying the DOM is expensive. Batch DOM updates using `DocumentFragment` or Virtual DOM (React).
- **Memory Leaks:** Unintentional global variables, forgotten timers/intervals, or lingering closures can consume excessive memory over time.
- **Main Thread Blocking:** Heavy synchronous calculations will freeze the UI. Offload heavy computation to **Web Workers**.

## 6. Security Considerations
- **Cross-Site Scripting (XSS):** Never use `innerHTML` or `insertAdjacentHTML` with unescaped user input. Always use `textContent` or `innerText`.
- **Third-Party Scripts:** External JS files can be hijacked. Always use Subresource Integrity (`integrity="sha384-..."`) tags.

## 7. Common Mistakes
- **Mutating State Directly:** Arrays (`push`, `pop`) mutate the original array. Modern JS prefers immutable operations (`map`, `filter`, spread syntax `...`).
- **`this` Binding:** Losing context of `this` in standard functions when used as callbacks. (Fix: Use arrow functions or `.bind()`).

## 8. Interview Questions
1. **Q:** What is the difference between `==` and `===`?
   **A:** `==` performs type coercion before comparison (e.g., `'1' == 1` is true). `===` requires both value and type identity to be strict (e.g., `'1' === 1` is false).
2. **Q:** Explain closures.
   **A:** A closure is a function that remembers the variables from its lexical scope, even after the outer function has returned.
3. **Q:** What is "Hoisting"?
   **A:** The behavior where variable and function declarations are moved to the top of their scope during compilation. (Note: `let` and `const` are hoisted too, but land in the "Temporal Dead Zone").

## 9. Production-Level Best Practices
- **Strict Mode:** Always use `"use strict";` or ES6 Modules (which use it by default).
- **Linting:** Enforce rules using ESLint + Prettier.
- **Fail Fast:** Validate inputs and throw custom `Error` objects early in your functions.
