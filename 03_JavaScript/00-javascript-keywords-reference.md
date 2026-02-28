# 00 — JavaScript Keywords & Concepts Reference

Use this file before `01+` modules.

For every keyword/concept:
- **What**: definition
- **When**: when to use
- **Where**: where you usually use it
- **How**: quick example

---

## `const`
- **What**: Declares a block-scoped variable that cannot be reassigned.
- **When**: Use by default for values that should not be reassigned.
- **Where**: Everywhere in modern JS (frontend + backend).
- **How**:
```js
const appName = 'Fullstack Roadmap'
```

## `let`
- **What**: Block-scoped variable that can be reassigned.
- **When**: Use when value changes over time (counters, toggles).
- **Where**: Loops, mutable state in plain JS.
- **How**:
```js
let count = 0
count += 1
```

## `var`
- **What**: Function-scoped variable (older JS).
- **When**: Rarely in modern code; mostly for legacy understanding.
- **Where**: Old codebases/interviews.
- **How**:
```js
var oldStyle = true
```

## `console.log()`
- **What**: Prints data to console for debugging.
- **When**: Debugging and learning.
- **Where**: Browser DevTools, Node terminal.
- **How**:
```js
console.log('Current user:', user)
```

## Data Types (Primitive vs Non-Primitive)
- **Primitive**: `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`
- **Non-Primitive**: objects, arrays, functions
- **When**: primitives for simple values, objects/arrays for structured data
- **How**:
```js
const name = 'Deepak' // primitive
const profile = { name: 'Deepak' } // non-primitive
```

## Type Conversion
- **What**: Convert one type to another (explicit/implicit).
- **When**: Input handling, API data normalization.
- **How**:
```js
Number('42') // 42
String(99) // '99'
Boolean('') // false
```

## Template Literals
- **What**: String interpolation using backticks.
- **When**: Dynamic strings.
- **How**:
```js
const msg = `Hello ${name}`
```

## Operators
- **What**: Symbols for calculations/comparisons/logical checks.
- **When**: All decision-making/calculation logic.
- **How**:
```js
const isAdult = age >= 18 && age < 60
```

## `if / else`
- **What**: Conditional branching.
- **When**: Two-way or multi-way decisions.
- **How**:
```js
if (score > 80) {
  grade = 'A'
} else {
  grade = 'B'
}
```

## `switch`
- **What**: Cleaner alternative for many fixed-value branches.
- **When**: Multiple exact matches (status, day, role).
- **How**:
```js
switch (role) {
  case 'admin':
    break
  default:
}
```

## Loops (`for`, `while`, `do...while`)
- **What**: Repeat code blocks.
- **When**: Iteration over numbers/data.
- **How**:
```js
for (let i = 0; i < 3; i += 1) console.log(i)
```

## `break` and `continue`
- **What**: Control loop flow.
- **When**: Stop loop (`break`) or skip current step (`continue`).

## Ternary (`condition ? a : b`)
- **What**: Short conditional expression.
- **When**: Small inline decisions.

## Function Declaration / Expression / Arrow
- **What**: Ways to define functions.
- **When**: Use declarations for reusable named logic, arrow for concise callbacks.
- **How**:
```js
function add(a, b) { return a + b }
const sub = function (a, b) { return a - b }
const mul = (a, b) => a * b
```

## Parameters, Arguments, Default Parameters
- **What**: Inputs to functions.
- **How**:
```js
const greet = (name = 'Guest') => `Hi ${name}`
```

## Rest and Spread (`...`)
- **What**: Rest collects; spread expands.
- **When**: Variable args, cloning, merging.
- **How**:
```js
function sum(...nums) { return nums.reduce((a, b) => a + b, 0) }
const arr2 = [...arr1, 10]
```

## Callback Function
- **What**: Function passed into another function.
- **When**: Async code, array methods, event handling.

## Higher-Order Function
- **What**: Function that takes/returns another function.
- **Examples**: `map`, `filter`, `reduce`, custom wrappers.

## Arrays
- **Use when**: Ordered collection of values.
- **Core methods**: `push`, `pop`, `shift`, `unshift`, `map`, `filter`, `reduce`, `find`, `some`, `every`, `forEach`

## Objects
- **Use when**: Key-value structured data.
- **Core APIs**: `Object.keys`, `Object.values`, `Object.entries`
- **`this`**: Refers to object context (depends on call-site).

## DOM Basics
- **What**: Browser representation of HTML.
- **Where**: Frontend web apps.
- **How**:
```js
document.querySelector('#app')
document.getElementById('title')
```

## Events, Bubbling, Capturing, Delegation
- **Bubbling**: child -> parent
- **Capturing**: parent -> child
- **Delegation**: handle child events at parent for dynamic lists

## ES6+ Important Features
- `destructuring`
- `modules (import/export)`
- `optional chaining (?.)`
- `nullish coalescing (??)`

## Async JavaScript
- **Call Stack**: execution stack of function calls
- **Event Loop**: schedules async callbacks
- **Microtasks**: promises
- **Macrotasks**: `setTimeout`, DOM events
- **Promise / async-await**: modern async patterns

## Advanced Concepts
- **Closure**: function remembers lexical scope
- **Hoisting**: declarations moved to top in compile phase
- **Prototype chain**: JS inheritance model
- **`call/apply/bind`**: set `this` explicitly
- **Currying**: `f(a,b)` -> `f(a)(b)`
- **Debounce/Throttle**: control rapid function calls
- **Memoization**: cache computed results

## OOP in JavaScript
- Constructor Functions
- Classes
- Inheritance
- Encapsulation (`#privateField`)
- Polymorphism
- Static methods

## Browser APIs
- `localStorage` / `sessionStorage`
- Geolocation API
- Intersection Observer
- Clipboard API

## Performance & Optimization
- Code splitting / lazy loading
- Prevent memory leaks (remove listeners/timers)
- Garbage collection awareness
- Profiling with DevTools

---

## Quick Rule of Thumb
1. Use `const` by default.
2. Prefer pure functions and array methods.
3. Use async/await for readable async flow.
4. Keep DOM updates minimal and event handling clean.
5. Optimize only after measuring.
