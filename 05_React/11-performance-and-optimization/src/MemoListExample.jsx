import { memo, useMemo, useState } from 'react'

// memo prevents re-render when props are unchanged.
const Row = memo(function Row({ value }) {
  return <li>{value}</li>
})

function MemoListExample() {
  const [query, setQuery] = useState('')
  // Create a large list once (lazy initialization).
  const [items] = useState(() => Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`))

  // useMemo avoids recalculating filtered items unnecessarily.
  const filtered = useMemo(
    () => items.filter((item) => item.toLowerCase().includes(query.toLowerCase())),
    [items, query],
  )

  return (
    <section>
      <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search" />
      <ul>
        {filtered.slice(0, 40).map((value) => (
          <Row key={value} value={value} />
        ))}
      </ul>
    </section>
  )
}

export default MemoListExample
