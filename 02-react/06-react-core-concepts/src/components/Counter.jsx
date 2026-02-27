import { useState } from 'react'

function Counter() {
  // Local component state with initial value 0.
  const [count, setCount] = useState(0)

  return (
    <section>
      <h3>Counter</h3>
      <p>Count: {count}</p>
      {/* Functional updates prevent stale state issues. */}
      <button onClick={() => setCount((value) => value + 1)}>Increment</button>
      <button onClick={() => setCount((value) => value - 1)}>Decrement</button>
    </section>
  )
}

export default Counter
