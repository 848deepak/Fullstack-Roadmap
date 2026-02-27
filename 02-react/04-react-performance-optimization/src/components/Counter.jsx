import React, { memo, useRef } from "react";

function Counter({ count, onIncrement }) {
  const renders = useRef(0);
  renders.current += 1;
  console.log("Counter render");

  return (
    <div className="panel">
      <h3>Memoized Counter</h3>
      <p className="value">Count: {count}</p>
      <button onClick={onIncrement}>Increment</button>
      <p className="muted">Render count: {renders.current}</p>
    </div>
  );
}

export default memo(Counter);
