import React, { useState, useCallback } from "react";

function ClickCounter() {
  const [count, setCount] = useState(0);

  // Fungsi incrementCount di-memoisasi menggunakan useCallback
  const incrementCount = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  return (
    <div>
      <h1>Click Count: {count}</h1>
      <button onClick={incrementCount}>Click Me!</button>
    </div>
  );
}

export default ClickCounter;
