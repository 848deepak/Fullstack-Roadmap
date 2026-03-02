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

<!-- DOCS_UPGRADE_V2026_START -->
## Documentation Upgrade Layer

### Breadcrumb Navigation
[Home](../README.md) > 05_React

### Internal Contents
- [Documentation Upgrade Layer](#documentation-upgrade-layer)
- [Conceptual Depth Model](#conceptual-depth-model)
- [Beginner Perspective](#beginner-perspective)
- [Intermediate Perspective](#intermediate-perspective)
- [Advanced Internal Working](#advanced-internal-working)
- [Under-the-Hood Architecture](#under-the-hood-architecture)
- [Real-World Use Cases](#real-world-use-cases)
- [Performance Considerations](#performance-considerations-upgrade)
- [Security Considerations](#security-considerations-upgrade)
- [Edge Cases and Limitations](#edge-cases-and-limitations)
- [Common Mistakes](#common-mistakes-upgrade)
- [Interview-Level Theory Questions](#interview-level-theory-questions-upgrade)
- [Production Best Practices](#production-best-practices-upgrade)
- [Folder Structure Diagram](#folder-structure-diagram-actual)
- [Examples Projects Advanced Production Map](#examples-projects-advanced-production-map)
- [Code References in Repository](#code-references-in-repository)
- [Cross-Module Links](#cross-module-links)
- [Navigation](#navigation)

### Conceptual Depth Model
This documentation extension preserves all existing module theory while adding architecture-level depth for `Module 05: React`. This README captures the module-level architecture narrative and practical learning progression. The dominant learning axis here is **component architecture and state management**, with internal behavior centered on **React render/commit lifecycle and reconciliation** and state/contracts centered on **component props, local/global state, and UI derivations**.

For every major concept in this module, analyze it through this lens:
- **Definition:** what the concept is and the precise technical boundary it defines.
- **Why it exists:** the failure mode or engineering bottleneck it solves.
- **How it works internally:** state changes, control flow, data flow, runtime behavior, and system boundaries.
- **When to use it:** the context where this concept provides leverage.
- **When not to use it:** cost, complexity, coupling, and maintainability trade-offs.
- **Performance implications:** latency, throughput, memory, I/O, network, CPU, and scalability behavior.
- **Security implications:** trust boundaries, attack surface, data exposure risks, and mitigation patterns.
- **Real-world scenario:** a production context where the concept appears in a full-stack system.
- **Code reference in repository:** practical anchor points inside this repository.

### Beginner Perspective
- Start with observable behavior for **component architecture and state management** before introducing abstractions.
- Track what inputs produce what outputs in **component props, local/global state, and UI derivations** workflows.
- Use one example at a time and explain expected behavior before extending it.

### Intermediate Perspective
- Connect module outputs to neighboring layers and contracts impacted by **component architecture and state management**.
- Analyze execution boundaries in **React render/commit lifecycle and reconciliation** to find bottlenecks and race conditions.
- Compare implementation options using maintainability, operability, and migration cost.

### Advanced Internal Working
- Model normal-path and failure-path control flow for **React render/commit lifecycle and reconciliation**.
- Specify invariants around **component props, local/global state, and UI derivations** that must hold under scale and partial failure.
- Document rollback and recovery behavior before introducing optimization layers.

### Under-the-Hood Architecture
- Core execution model in this module: **React render/commit lifecycle and reconciliation**.
- Primary state domain and contracts: **component props, local/global state, and UI derivations**.
- Dominant architectural risk to isolate: **uncontrolled re-renders, stale closures, and brittle state boundaries**.

### Real-World Use Cases
- Build or migrate a system where **component architecture and state management** is a critical delivery concern.
- Operate high-change environments where **React render/commit lifecycle and reconciliation** behavior must stay predictable.
- Harden production paths where failures in **component props, local/global state, and UI derivations** handling have business impact.

### Performance Considerations Upgrade
- Benchmark latency and throughput at boundaries affected by **React render/commit lifecycle and reconciliation**.
- Reduce unnecessary work in **component props, local/global state, and UI derivations** processing paths before micro-optimizations.
- Track p95/p99 under burst traffic and verify graceful degradation behavior.

### Security Considerations Upgrade
- Protect trust boundaries around **component props, local/global state, and UI derivations** with strict validation and least privilege.
- Review abuse scenarios that exploit weak assumptions in **component architecture and state management** flows.
- Add auditability for privileged operations and incident reconstruction.

### Edge Cases and Limitations
- Invalid input types, partial payloads, and schema drift across versions.
- Concurrency conflicts, race conditions, and eventual consistency gaps in distributed flows.
- Environment-specific behavior differences (local, CI, staging, production).

### Common Mistakes Upgrade
- Treating **React render/commit lifecycle and reconciliation** behavior as deterministic without measuring it under load.
- Introducing abstractions before clarifying ownership of **component props, local/global state, and UI derivations** boundaries.
- Ignoring **uncontrolled re-renders, stale closures, and brittle state boundaries** until late integration or production rollout.

### Interview-Level Theory Questions Upgrade
1. How do you decide when state should stay local versus moving to context/store in a large React application?
2. What is the practical difference between render phase and commit phase, and how does that influence performance debugging?
3. How would you diagnose stale-closure bugs in `useEffect`, event handlers, and async callbacks?
4. When does `React.memo`/`useMemo`/`useCallback` improve performance, and when does it add harmful complexity?
5. How would you evolve a growing React codebase into feature-based architecture without breaking delivery velocity?

### Production Best Practices Upgrade
- Define clear ownership boundaries for UI state, server state, and derived state; avoid mixing responsibilities.
- Standardize feature-level architecture (`ui`, `hooks`, `api`, `state`, `tests`) so teams scale without coupling.
- Enforce performance budgets (bundle size, interaction latency, render count) in CI for critical routes.
- Include security defaults for frontend boundaries: safe HTML rendering, token handling policy, and dependency review cadence.

### Folder Structure Diagram (Actual)
```text
05_React/
├── 01-react-router-task-manager/
│   ├── public/
│   ├── src/
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   └── lighthouse-report.json
├── 01_code_examples/
│   ├── README.md
│   └── StateIsolationExample.jsx
├── 02-auth-theme-context/
│   ├── src/
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   └── vite.config.js
├── 02_practice_problems/
│   └── README.md
├── 03-advanced-ui-design-system/
│   ├── src/
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   └── vite.config.js
├── 03_interview_questions/
│   └── README.md
├── 04-react-performance-optimization/
│   ├── src/
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   └── vite.config.js
├── 04_mini_project/
│   └── README.md
├── 05-react-testing-task-manager/
│   ├── public/
│   ├── src/
│   ├── .env
│   ├── .gitignore
│   ├── package-lock.json
│   └── package.json
├── 05_advanced_deep_dive/
│   └── README.md
├── 06-react-core-concepts/
│   ├── src/
│   ├── 00-reference.md
│   └── README.md
├── 07-react-hooks-deep-dive/
│   ├── src/
│   ├── 00-reference.md
│   └── README.md
├── 08-state-management-patterns/
│   ├── src/
│   ├── 00-reference.md
│   ├── README.md
│   └── state-management-advanced-notes.md
├── 09-forms-validation/
│   ├── src/
│   ├── 00-reference.md
│   └── README.md
├── 10-api-integration/
│   ├── src/
│   ├── 00-reference.md
│   └── README.md
├── 11-performance-and-optimization/
│   ├── src/
│   ├── 00-reference.md
│   └── README.md
├── 12-testing-guide/
│   ├── src/
│   ├── 00-reference.md
│   └── README.md
├── 13-system-design-and-deployment/
│   ├── 00-reference.md
│   ├── architecture-template.md
│   ├── deployment-checklist.md
│   └── README.md
├── 14-advanced-react-patterns/
│   ├── src/
│   ├── 00-reference.md
│   └── README.md
├── 15-advanced-react-concepts/
│   ├── 00-reference.md
│   └── README.md
├── 16-production-level-skills/
│   ├── 00-reference.md
│   ├── clean-code-checklist.md
│   ├── deployment-guide.md
│   ├── folder-structure-guide.md
│   ├── jwt-role-based-access.md
│   └── README.md
├── advanced/
│   ├── 01_compound_components_pattern.jsx
│   ├── 02_reducer_with_command_pattern.jsx
│   └── 03_render_budget_list_virtualization.jsx
├── examples/
│   ├── 01_beginner_controlled_form.jsx
│   ├── 02_intermediate_useAsyncResource.jsx
│   ├── 03_edge_case_empty_error_states.jsx
│   └── advanced-performance.jsx
├── production/
│   ├── 01_query_cache_with_ttl.js
│   ├── 02_error_boundary_with_fallback.jsx
│   └── 03_permission_gate_and_feature_flags.jsx
├── projects/
│   ├── 01_realtime_task_board_core.jsx
│   └── 02_product_search_pagination.jsx
├── 00-react-keywords-hooks-reference.md
├── README.md
```

### Examples Projects Advanced Production Map
- [Examples](01_code_examples/README.md): foundational patterns and minimal reproducible implementations.
- [Projects](04_mini_project/README.md): integrated workflows with realistic constraints and trade-offs.
- [Advanced](05_advanced_deep_dive/README.md): deeper internals, system boundaries, and scaling-oriented decisions.
- [Production Architecture](../20_Production_Architecture/README.md): reliability, observability, and long-term operability principles.

### Code References in Repository
- `05_React/00-react-keywords-hooks-reference.md`

### Cross-Module Links
- [Root Roadmap](../README.md)
- [05_React](README.md)
- [System Design](../11_System_Design/README.md)
- [Testing](../16_Testing/README.md)
- [Production Architecture](../20_Production_Architecture/README.md)

### Navigation
- **Previous Module:** [04_Advanced_JavaScript](../04_Advanced_JavaScript/README.md)
- **Next Module:** [06_NextJS](../06_NextJS/README.md)

<!-- DOCS_UPGRADE_V2026_END -->
