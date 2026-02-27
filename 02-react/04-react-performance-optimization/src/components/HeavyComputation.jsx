import { useMemo, useRef } from "react";

const expensiveCalculation = (n) => {
  let result = 0;
  for (let i = 0; i < 150000; i += 1) {
    result += Math.sqrt(i + n) * Math.sin(i + n);
  }
  return result.toFixed(2);
};

export default function HeavyComputation({ inputValue }) {
  const renders = useRef(0);
  renders.current += 1;

  const computed = useMemo(() => {
    console.log("Heavy computation executed");
    return expensiveCalculation(inputValue);
  }, [inputValue]);

  return (
    <div className="panel">
      <p>
        Computation depends on the input value. The heavy function only runs when the input
        changes.
      </p>
      <p className="value">Computed value: {computed}</p>
      <p className="muted">Render count: {renders.current}</p>
    </div>
  );
}
