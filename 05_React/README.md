# Module 05: React

## 1. Concept Overview
React is a declarative, component-based JavaScript library for building user interfaces. It was created by Facebook to solve the massive problem of managing complex UI states across thousands of DOM elements. React abstracts the DOM away entirely.

## 2. Theory from Scratch
- **Components:** The building blocks of React. A component is just a JS function that returns HTML-like syntax called JSX.
- **JSX:** Syntax extension allowing HTML inside JavaScript. Under the hood, `<div id="box"></div>` compiles to `React.createElement('div', {id: 'box'})`.
- **Props:** External incoming data passed from a parent component down to a child. Props are **read-only** (immutable).
- **State:** Internal data managed within a component. When state changes, React automatically re-renders that component and its children.
- **Hooks (16.8+):** 
  - `useState`: Manages simple state.
  - `useEffect`: Handles side effects (data fetching, DOM measurements, subscriptions).
  - `useContext`: Accesses global data without prop-drilling.

## 3. Internal Working (Under the Hood)
React does not manipulate the actual DOM on every state change; this would be horribly slow. Let's look at the **Fiber Architecture & Virtual DOM**:

1. **Render Phase:** When state changes, React calls your component function to generate a new "Virtual DOM" tree (a lightweight JS object representing the UI).
2. **Reconciliation (Diffing):** React compares (diffs) the new Virtual DOM against the previous Virtual DOM to find exactly what changed.
3. **Commit Phase:** React takes the minimal set of changes and applies them surgically to the real browser DOM in one fast batch.

## 4. Why it is used in Production
React dominates the industry (Netflix, Airbnb, Uber) because of its massive ecosystem, massive talent pool, and strictly unidirectional data flow. This data flow (`Parent -> Child`) makes debugging highly predictable compared to Angular's two-way data binding.

## 5. Architecture Diagrams

**React's Unidirectional Data Flow & Render Cycle:**
```text
           +---------------------+
           |   State Change      |
           |   (setState)        |
           +----------+----------+
                      |
           +----------v----------+
           | New Virtual DOM     |
           | (JS Objects)        |
           +----------+----------+
                      |
           +----------v----------+
           | React Diffing Algo  | compares with
           | (Reconciliation)    |<------------+ Old Virtual DOM
           +----------+----------+
                      |
           +----------v----------+
           | Commit Phase        |
           | (Batch Updates)     |
           +----------+----------+
                      |
           +----------v----------+
           |   Real Browser DOM  |
           +---------------------+
```

## 6. Performance Considerations
- **Unnecessary Re-renders:** A parent component re-rendering automatically re-renders ALL its children.
- **Optimization Hooks:** 
  - `React.memo`: Wrap a component so it only re-renders if its explicit props change.
  - `useMemo`: Cache the result of an expensive calculation.
  - `useCallback`: Cache a function reference so it isn't repeatedly recreated on every render.
- **Keys:** Always provide a unique `key` prop when mapping over arrays. Without keys, React can't track which items were added/removed/reordered, causing massive performance drops and state bugs.

## 7. Security Considerations
- **XSS via dangerouslySetInnerHTML:** React inherently sanitizes strings before rendering them. However, using `<div dangerouslySetInnerHTML={{ __html: userText }} />` bypasses this. Only do this if you run `userText` through a sanitizer like DOMPurify first.

## 8. Common Mistakes
- **Mutating State Directly:** `state.user.name = "John"` will NOT trigger a re-render. You must use `setState({ ...state, user: { ...state.user, name: "John"} })`.
- **Missing Dependency Arrays:** A `useEffect(() => { ... })` without a `[]` dependency array runs on *every single render*, often resulting in an infinite loop of API calls.
- **Prop Drilling:** Passing props down through 5 layers of intermediate components that don't need the data, just to reach a distant child. (Fix: Use Context API or Zustand/Redux).

## 9. Interview Questions
1. **Q:** What is the Virtual DOM and why is it faster than the real DOM?
   **A:** The real DOM isn't inherently slow, but *repainting* the screen is. The Virtual DOM is a fast JS representation. React diffs two V-DOMs in memory, calculates the smallest number of real DOM mutations needed, and applies them all at once.
2. **Q:** Explain the Component Lifecycle in terms of Hooks.
   **A:** `useEffect` acts as `componentDidMount` (with `[]` deps), `componentDidUpdate` (with specific deps like `[id]`), and `componentWillUnmount` (by returning a cleanup function).
3. **Q:** What is Prop Drilling and how do you solve it?
   **A:** Passing data from component A to component Z through B,C,D,E. Solved via Context API, Redux/Zustand, or component composition (passing JSX children).

## 10. Production-Level Best Practices
- **Custom Hooks:** Abstract complex logic out of your UI components into custom hooks (`useAuth`, `useFetchUser`) to keep components strictly focused on rendering.
- **Strict Mode:** Always run `<React.StrictMode>` in development to catch unsafe lifecycles and unintended side effects (it intentionally double-renders your components to expose bugs).
- **Directory Structure:** Organize by feature, not file type. 
  *(Good: `/features/auth/components, /features/auth/api`. Bad: `/components/auth, /api/auth`).*
