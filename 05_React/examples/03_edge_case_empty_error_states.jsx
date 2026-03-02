import { useMemo } from 'react';

// Beginner: always handle loading, empty, and error states explicitly.
// Advanced: deterministic state rendering avoids contradictory UI states.
export default function EdgeCaseListStates({ loading, error, items = [] }) {
  const status = useMemo(() => {
    if (loading) return 'loading';
    if (error) return 'error';
    if (!Array.isArray(items) || items.length === 0) return 'empty';
    return 'ready';
  }, [loading, error, items]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'error') return <p role="alert">Something went wrong.</p>;
  if (status === 'empty') return <p>No items found.</p>;

  return <ul>{items.map((item) => <li key={item.id}>{item.label}</li>)}</ul>;
}
