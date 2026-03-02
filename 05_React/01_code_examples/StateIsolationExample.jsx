import { useMemo, useState } from 'react';

// Beginner: This component manages local state and renders a filtered list.
// Advanced: useMemo prevents unnecessary recalculation on unrelated renders.
export default function StateIsolationExample({ users }) {
  const [query, setQuery] = useState('');

  const filteredUsers = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return users;
    return users.filter((user) => user.name.toLowerCase().includes(normalized));
  }, [users, query]);

  return (
    <section>
      <input
        aria-label="Search users"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search by name"
      />
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </section>
  );
}
