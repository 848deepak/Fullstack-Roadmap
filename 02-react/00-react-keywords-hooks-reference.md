# 00 — React Keywords, Hooks & Concepts Reference

Use this before React modules.

For each topic:
- **What**
- **When**
- **Where**
- **How**

---

## React
- **What**: UI library for component-based interfaces.
- **When**: Building interactive web apps and SPAs.
- **Where**: Frontend (often with Vite/Next.js).

## SPA (Single Page Application)
- **What**: App loads one HTML shell; routing happens client-side.
- **When**: Dynamic app experiences.

## Virtual DOM
- **What**: In-memory representation used to optimize UI updates.
- **When**: Every React re-render cycle.

## JSX
- **What**: Syntax extension combining JS + HTML-like markup.
- **How**:
```jsx
const element = <h1>Hello</h1>
```

## Components
- **Functional Component**: Preferred modern style.
- **Class Component**: Legacy but still interview-relevant.

## Props
- **What**: Read-only inputs from parent to child.
- **When**: Pass data/config to reusable components.

## State
- **What**: Internal mutable data controlling UI.
- **When**: UI changes over time.

## Event Handling in React
- **What**: Respond to user actions via handlers.
- **How**:
```jsx
<button onClick={handleClick}>Click</button>
```

---

## Core Hooks

## `useState`
- **What**: Local state in functional components.
- **When**: Input values, toggles, counters.

## `useEffect`
- **What**: Side effects (API calls, subscriptions, timers).
- **When**: After render and dependency updates.
- **Cleanup**: return function in effect.

## `useRef`
- **What**: Mutable holder that does not trigger re-render.
- **When**: DOM access, instance values.

## `useContext`
- **What**: Read global value from context provider.
- **When**: Theme/auth/shared state.

## `useMemo`
- **What**: Memoize expensive computed value.
- **When**: Costly derived data.

## `useCallback`
- **What**: Memoize function reference.
- **When**: Prevent unnecessary child re-renders.

## `useReducer`
- **What**: State management via reducer pattern.
- **When**: Complex state transitions.

---

## Lifecycle (Functional Components)
- **Mounting**: first render
- **Updating**: state/props change
- **Unmounting**: cleanup
- Managed mainly via `useEffect` and dependency arrays.

## Forms
- **Controlled**: React state controls input value.
- **Uncontrolled**: DOM handles value via refs.
- **Validation**: client-side checks before submit.

## Routing (React Router)
- Client-side routes
- Dynamic routes (`/users/:id`)
- Nested routes
- Protected routes
- 404 fallback route

## State Management (Beyond Local State)
- Lifting state up
- Context API
- Redux (scalable global state)
- Zustand/Recoil (optional alternatives)

## API Handling
- Fetch/Axios
- Loading & error UI states
- Custom hooks for reusable data logic
- Optimistic UI for better UX

## Advanced React Patterns
- HOC
- Render props
- Compound components
- Custom hooks
- Error boundaries
- Portals

## Performance Optimization
- Memoization (`useMemo`, `useCallback`)
- `React.memo`
- Code splitting and lazy loading
- Suspense
- Profiling in React DevTools

## Advanced React Concepts
- SSR / SSG
- Hydration
- Concurrent rendering
- Reconciliation
- Fiber architecture

## Testing
- Unit tests
- Integration tests
- Jest
- React Testing Library
- API mocking

## Production Skills
- Scalable folder structure
- Reusable components and clean code
- TypeScript with React
- JWT authentication and RBAC
- Deployment (Vercel/Netlify)

---

## Quick Rule of Thumb
1. Keep components small and focused.
2. Lift state only when needed.
3. Prefer custom hooks for reusable logic.
4. Handle loading/error states for every API call.
5. Measure performance before optimizing.
