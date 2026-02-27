import { useMemo, useState } from 'react'

function UseMemoExample() {
  const [number, setNumber] = useState(1)

  // Memoize derived value to avoid unnecessary recalculation.
  const squared = useMemo(() => number * number, [number])

  return (
    <section>
      <p>Number: {number}</p>
      <p>Squared: {squared}</p>
      <button onClick={() => setNumber((value) => value + 1)}>Increase</button>
    </section>
  )
}

export default UseMemoExample
