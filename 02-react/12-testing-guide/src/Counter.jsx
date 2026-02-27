import { useState } from 'react'

function Counter() {
  // Testable state value for a simple UI interaction.
  const [count, setCount] = useState(0)
  return (
    <div>
      <p data-testid="count-value">{count}</p>
      <button onClick={() => setCount((value) => value + 1)}>Increase</button>
    </div>
  )
}

export default Counter
