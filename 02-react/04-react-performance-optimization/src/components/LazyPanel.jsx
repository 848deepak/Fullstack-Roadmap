export default function LazyPanel() {
  return (
    <div className="panel">
      <h3>Lazy Loaded Panel</h3>
      <p>
        This component is code-split and loaded only when needed using React.lazy and Suspense.
      </p>
      <ul>
        <li>Improves initial load performance</li>
        <li>Loads on demand</li>
        <li>Works great for large sections</li>
      </ul>
    </div>
  );
}
