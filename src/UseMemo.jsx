import React, { useState, useMemo } from "react";
export default function App() {
  const [number, setNumber] = useState(0);
  const [incrementor, setIncrementor] = useState(1);
  const expensiveComputation = useMemo(() => {
    console.log("Computing...");
    return number * 2;
  }, [number]);
  return (
    <div>
      <h1>useMemo Example</h1>
      <p>Number: {number}</p>
      <p>Computed Value: {expensiveComputation}</p>
      <button onClick={() => setNumber(number + incrementor)}>Increment</button>
      <button onClick={() => setIncrementor(incrementor + 1)}>
        Increase Incrementor
      </button>
    </div>
  );
}
