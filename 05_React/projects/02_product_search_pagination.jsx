import { useMemo, useState } from 'react';

// Mini project core: search + pagination on local dataset.
// Beginner: derive paginated data using filter/slice.
// Advanced: memoization avoids expensive recomputations.
export default function ProductSearchPagination({ products }) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((item) => item.name.toLowerCase().includes(q));
  }, [products, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  return (
    <section>
      <h2>Product Search</h2>
      <input value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} placeholder="Search" />
      <ul>{pageItems.map((item) => <li key={item.id}>{item.name}</li>)}</ul>
      <button disabled={safePage === 1} onClick={() => setPage((p) => p - 1)}>Prev</button>
      <span>{safePage} / {totalPages}</span>
      <button disabled={safePage === totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
    </section>
  );
}
