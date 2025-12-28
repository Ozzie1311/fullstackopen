import Button from './Button.jsx'
import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood((prevState) => prevState + 1)
  const handleNeutralClick = () => setNeutral((prevState) => prevState + 1)
  const handleBadClick = () => setBad((prevState) => prevState + 1)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text='good' handleClick={handleGoodClick} />
      <Button text='neutral' handleClick={handleNeutralClick} />
      <Button text='bad' handleClick={handleBadClick} />
      <h2>Statistics</h2>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
    </div>
  )
}

export default App
