import React, { useState, useEffect, useCallback, useMemo } from 'react';

/**
 * ==========================================
 * ADVANCED REACT PRODUCTION PATTERNS
 * ==========================================
 * Demonstrates:
 * 1. Custom Hooks (Data Fetching with state/error/loading)
 * 2. useCallback & useMemo for heavy performance optimization
 * 3. Proper Cleanup in useEffect (preventing memory leaks)
 * 4. Conditional Rendering & Loading States
 */

// ----------------------------------------------------------------------
// 1. CUSTOM HOOK: useDebounce
// Prevents API spam when a user is typing in a search box quickly.
// Wait until they stop typing for X milliseconds before updating the value.
// ----------------------------------------------------------------------
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // CLEANUP: If 'value' changes before 'delay' completes, clear the old timeout.
        return () => clearTimeout(handler);
    }, [value, delay]); // Only re-call if value or delay changes

    return debouncedValue;
}

// ----------------------------------------------------------------------
// 2. CHILD COMPONENT (Memoized)
// React.memo prevents this component from re-rendering UNLESS its explicit
// props (user, onSelect) have changed in reference.
// ----------------------------------------------------------------------
const UserCard = React.memo(({ user, onSelect }) => {
    // console.log(`Rendering UserCard: ${user.name}`); // Proof of optimization
    return (
        <li className="user-card" style={{ padding: '1rem', border: '1px solid #ccc', marginBottom: '0.5rem' }}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            {/* The onSelect function must be stable (via useCallback) or this re-renders every time! */}
            <button onClick={() => onSelect(user.id)} className="btn-primary">
                View Profile
            </button>
        </li>
    );
});

// ----------------------------------------------------------------------
// 3. MAIN COMPONENT
// ----------------------------------------------------------------------
export default function UserDirectory() {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);

    // Apply the custom debounce hook
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    // ----------------------------------------------------------------------
    // EFFECT: Data Fetching with AbortController
    // ----------------------------------------------------------------------
    useEffect(() => {
        // If the search is empty after debouncing, clear results and abort
        if (!debouncedSearchTerm.trim()) {
            setUsers([]);
            return;
        }

        // AbortController allows us to cancel an in-flight fetch request
        // if the component unmounts OR the effect runs again (race conditions).
        const controller = new AbortController();

        const fetchUsers = async () => {
            setLoading(true);
            setError(null);

            try {
                // Simulating a real API call to a placeholder endpoint
                const res = await fetch(`https://jsonplaceholder.typicode.com/users?name_like=${debouncedSearchTerm}`, {
                    signal: controller.signal // Link the fetch to the abort controller
                });

                if (!res.ok) throw new Error("Network response was not OK");

                const data = await res.json();
                setUsers(data);

            } catch (err) {
                // Ignore the error if it was a deliberate abort
                if (err.name !== 'AbortError') {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();

        // CLEANUP: Cancel the HTTP request if the user types something new
        // before the previous request even finished downloading.
        return () => controller.abort();

    }, [debouncedSearchTerm]); // The dependency array: run this block exactly when this value changes.

    // ----------------------------------------------------------------------
    // CALLBACK: Stable function reference
    // ----------------------------------------------------------------------
    // If we passed an inline `() => ...` down to the Child UserCard, it would
    // be a new memory address on every render, breaking the React.memo cache.
    // useCallback guarantees the memory address stays identical across renders.
    const handleSelectUser = useCallback((id) => {
        console.log(`User ${id} selected for deep dive views`);
        setSelectedUserId(id);
    }, []);

    // ----------------------------------------------------------------------
    // MEMO: Heavy calculation caching
    // ----------------------------------------------------------------------
    // Imagine filtering meant calculating exact GPS coordinates for 10,000 users.
    // We only want to run that math if 'users' literally changes.
    const activeUsersList = useMemo(() => {
        // Just a simple example filter, but imagine it's an O(N^2) operation.
        return users.filter(user => user.email.includes('.biz') || user.email.includes('.tv'));
    }, [users]);

    return (
        <div className="directory-container" style={{ maxWidth: '600px', margin: '0 auto', fontFamily: 'system-ui' }}>
            <h1>Enterprise User Directory</h1>

            <div className="search-bar" style={{ marginBottom: '2rem' }}>
                <input
                    type="text"
                    placeholder="Search users by name (e.g. 'Leanne')..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', border: '2px solid #3b82f6', borderRadius: '4px' }}
                />
                <small style={{ color: '#64748b' }}>
                    Type to search. Delays for 500ms before hitting API.
                </small>
            </div>

            {error && (
                <div style={{ padding: '1rem', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '4px' }}>
                    Error fetching data: {error}
                </div>
            )}

            {loading ? (
                <div className="spinner">Loading secure data from server...</div>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {users.map(user => (
                        <UserCard
                            key={user.id}
                            user={user}
                            onSelect={handleSelectUser}
                        />
                    ))}
                </ul>
            )}

            {!loading && users.length === 0 && debouncedSearchTerm && (
                <p>No results found for "{debouncedSearchTerm}"</p>
            )}
        </div>
    );
}
