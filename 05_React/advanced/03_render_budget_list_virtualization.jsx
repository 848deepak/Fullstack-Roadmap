import { useMemo, useState } from 'react';

// Beginner: render only visible list slice for performance.
// Advanced: simple windowing pattern reduces render cost on huge datasets.
export default function RenderBudgetListVirtualization({ items }) {
  const [offset, setOffset] = useState(0);
  const windowSize = 30;

  const visibleItems = useMemo(() => items.slice(offset, offset + windowSize), [items, offset]);

  return (
    <section>
      <h2>Virtualized List (Basic)</h2>
      <button disabled={offset === 0} onClick={() => setOffset((v) => Math.max(0, v - windowSize))}>Prev Window</button>
      <button disabled={offset + windowSize >= items.length} onClick={() => setOffset((v) => v + windowSize)}>Next Window</button>
      <ul>{visibleItems.map((item) => <li key={item.id}>{item.label}</li>)}</ul>
    </section>
  );
}
