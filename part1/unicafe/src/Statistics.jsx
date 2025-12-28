const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  return (
    <>
      <h2>Statistics</h2>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>all {total} </p>
      <p>average {good ? (good - bad) / total : 0}</p>
      <p>positive {good ? `${(good / total) * 100}%` : 0}</p>
    </>
  )
}

export default Statistics
