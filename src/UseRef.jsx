import React, { useRef, useEffect } from "react";
export default function App() {
  const inputRef = useRef(null);
  useEffect(() => {
    console.log(inputRef.current.value);
  }, []);
  return <input ref={inputRef} type="text" />;
}
