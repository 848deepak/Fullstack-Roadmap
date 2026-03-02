import { useCallback, useEffect, useRef, useState } from 'react';

// Beginner: custom hook encapsulates loading/data/error state.
// Advanced: request sequencing avoids stale-response overwrites.
function useAsyncResource(fetcher, deps = []) {
  const [state, setState] = useState({ loading: true, data: null, error: null });
  const latestRequestIdRef = useRef(0);

  const run = useCallback(async () => {
    const currentRequestId = latestRequestIdRef.current + 1;
    latestRequestIdRef.current = currentRequestId;
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const data = await fetcher();
      setState((prev) =>
        currentRequestId !== latestRequestIdRef.current
          ? prev
          : { loading: false, data, error: null }
      );
    } catch (error) {
      setState((prev) =>
        currentRequestId !== latestRequestIdRef.current
          ? prev
          : { loading: false, data: null, error }
      );
    }
  }, [fetcher]);

  useEffect(() => {
    run();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { ...state, reload: run };
}

export default function IntermediateUseAsyncResource() {
  const { loading, data, error, reload } = useAsyncResource(
    async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=3');
      if (!response.ok) throw new Error('Failed to fetch users');
      return response.json();
    },
    []
  );

  if (loading) return <p>Loading users...</p>;
  if (error) return <p role="alert">{error.message}</p>;

  return (
    <section>
      <h2>Users</h2>
      <button onClick={reload}>Reload</button>
      <ul>{data.map((user) => <li key={user.id}>{user.name}</li>)}</ul>
    </section>
  );
}
