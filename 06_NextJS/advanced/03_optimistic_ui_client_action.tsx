'use client';

import { useOptimistic, useState, useTransition } from 'react';

// Beginner: optimistic UI updates immediately before server confirms.
// Advanced: improves perceived performance and user responsiveness.
export default function OptimisticUiClientAction() {
  const [items, setItems] = useState<string[]>(['Initial task']);
  const [isPending, startTransition] = useTransition();

  const [optimisticItems, addOptimisticItem] = useOptimistic(items, (state, newItem: string) => [
    ...state,
    `${newItem} (saving...)`
  ]);

  function handleAdd() {
    const newItem = `Task ${items.length + 1}`;
    addOptimisticItem(newItem);

    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 400));
      setItems((prev) => [...prev, newItem]);
    });
  }

  return (
    <section>
      <button onClick={handleAdd} disabled={isPending}>Add Task</button>
      <ul>{optimisticItems.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ul>
    </section>
  );
}
