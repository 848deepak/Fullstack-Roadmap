import React, { Suspense, useCallback, useMemo, useState } from "react";
import Counter from "./components/Counter.jsx";
import HeavyComputation from "./components/HeavyComputation.jsx";

const LazyPanel = React.lazy(() => import("./components/LazyPanel.jsx"));

const generateItems = (count) =>
  Array.from({ length: count }, (_, i) => ({ id: i + 1, label: `Item ${i + 1}` }));

export default function App() {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState(10);
  const [showLazy, setShowLazy] = useState(false);
  const [itemsCount, setItemsCount] = useState(500);

  const items = useMemo(() => generateItems(itemsCount), [itemsCount]);

  const handleIncrement = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const handleToggleLazy = useCallback(() => {
    setShowLazy((prev) => !prev);
  }, []);

  return (
    <div className="page">
      <header className="header">
        <h1>Experiment 1.4 – Performance Optimization in React</h1>
        <p>
          Memoization, expensive computation optimization, and code splitting in a single demo.
        </p>
      </header>

      <section className="card">
        <h2>Easy: React.memo to prevent re-renders</h2>
        <div className="row">
          <Counter count={count} onIncrement={handleIncrement} />
          <div className="controls">
            <button onClick={handleIncrement}>Increment from Parent</button>
            <p className="muted">Parent render count updates without re-rendering memoized child.</p>
          </div>
        </div>
      </section>

      <section className="card">
        <h2>Medium: useMemo for heavy computation</h2>
        <div className="row">
          <label className="label">
            Input value
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(Number(e.target.value))}
            />
          </label>
          <button onClick={handleIncrement}>Increment counter</button>
          <span className="pill">Counter: {count}</span>
        </div>
        <HeavyComputation inputValue={inputValue} />
        <p className="muted">Counter changes do not re-run the heavy calculation.</p>
      </section>

      <section className="card">
        <h2>Also memoizing list creation</h2>
        <div className="row">
          <label className="label">
            Items
            <input
              type="range"
              min="100"
              max="2000"
              step="100"
              value={itemsCount}
              onChange={(e) => setItemsCount(Number(e.target.value))}
            />
          </label>
          <span className="pill">{itemsCount} items</span>
        </div>
        <div className="list">
          {items.slice(0, 20).map((item) => (
            <span key={item.id} className="list-item">
              {item.label}
            </span>
          ))}
          <span className="muted">Showing first 20 for brevity.</span>
        </div>
      </section>

      <section className="card">
        <h2>Hard: React.lazy + Suspense</h2>
        <button onClick={handleToggleLazy}>
          {showLazy ? "Hide" : "Load"} Lazy Panel
        </button>
        <Suspense fallback={<div className="loader">Loading module…</div>}>
          {showLazy && <LazyPanel />}
        </Suspense>
      </section>
    </div>
  );
}
