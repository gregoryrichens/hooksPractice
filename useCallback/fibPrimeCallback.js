import React from "react"
import ReactDOM from "react-dom"
// it's possible that we exported these via React.memo()
// which takes a component, memoizes it so that re-renders only
// occur when props change, optional second arg is function
// takes prevprops and currprops, and allows you to set logic that
// returns a boolean which will determine when component is
// re-rendered
import NthFib from './NthFib'
import NthPrime from './NthPrime'

import "./styles.css"

function App() {
  const [fibCount, setFibCount] = React.useState(1)
  const [primeCount, setPrimeCount] = React.useState(1)

  const handleReset = () => {
    setFibCount(1)
    setPrimeCount(1)
  }

  const add10 = () => {
    setFibCount((c) => c + 10)
    setPrimeCount((c) => c + 10)
  }

  // use callback returns a memoized function that only re-renders
  // when the value in its dependency array (second arg) change
  // this means you can avoid constant re-renders
  const incrementFib = React.useCallback(() => setFibCount((c) => c + 1), [])
  const incrementPrime = React.useCallback(() => setPrimeCount((c) => c + 1), [])

  return (
    <React.Fragment>
      <button onClick={add10}>Add 10</button>
      <button onClick={handleReset}>Reset</button>
      <hr />
      {/* this component would typically re-render whenever
      the value for count changes or when increment changes
      bc increment is a function(object) and newness of props
      is determined by equality to previous props, equivalent objects are never 'equal', so this componenet would
      re-render on every change of either nth fib or nth prime */}
      <NthFib
        count={fibCount}
        increment={incrementFib}
      />
      <hr />
      {/* see above */}
      <NthPrime
        count={primeCount}
        increment={incrementPrime}
      />
    </React.Fragment>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
