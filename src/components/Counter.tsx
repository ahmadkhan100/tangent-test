import { useState } from 'react'
import './Counter.css'

const Counter = () => {
  const [count, setCount] = useState(0)
  const [step, setStep] = useState(1)

  const increment = () => setCount(prev => prev + step)
  const decrement = () => setCount(prev => prev - step)
  const reset = () => setCount(0)

  return (
    <div className="counter-container">
      <div className="counter-card">
        <h2>🔢 Counter Component</h2>
        
        <div className="counter-display">
          <span className="count-value">{count}</span>
        </div>

        <div className="step-control">
          <label htmlFor="step">Step size:</label>
          <input
            id="step"
            type="number"
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
            min="1"
            max="10"
          />
        </div>

        <div className="counter-buttons">
          <button onClick={decrement} className="btn btn-secondary">
            -{step}
          </button>
          <button onClick={reset} className="btn btn-danger">
            Reset
          </button>
          <button onClick={increment} className="btn btn-primary">
            +{step}
          </button>
        </div>

        <div className="counter-info">
          <p>Current count: <strong>{count}</strong></p>
          <p>Is even: <strong>{count % 2 === 0 ? 'Yes' : 'No'}</strong></p>
          <p>Is positive: <strong>{count > 0 ? 'Yes' : 'No'}</strong></p>
        </div>
      </div>
    </div>
  )
}

export default Counter
