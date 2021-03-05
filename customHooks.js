import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

/*
  Instructions:
    Finish implementing the `useWait` custom Hook.
    `useWait` should return a boolean that changes from
    `false` to `true` after `delay` seconds.
*/

// *****
// CUSTOM HOOK IMPLEMENTED BELOW
function useWait (delay) {
  const [waited, setWaited] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setWaited(true), delay);

    return () => { window.clearTimeout(id) };
  }, [delay]);

  return waited;
}
// CUSTOM HOOK IMPLEMENTED ABOVE
// *****

function Wait({ delay = 1000, placeholder, ui }) {
  const show = useWait(delay)

  return show === true
    ? ui
    : placeholder
}

function App() {
  return (
    <div className="App">
      <Wait
        delay={3000}
        placeholder={<p>Waiting...</p>}
        ui={<p>This text should appear after 3 seconds.</p>}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);