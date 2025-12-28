import StatisticsLine from './StatisticsLine.jsx'

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = total === 0 ? 0 : (good - bad) / total
  const positivePercentage = total === 0 ? 0 : (good / total) * 100
  return (
    <>
      <h2>Statistics</h2>
      {total === 0 ? (
        <p>No feedback given</p>
      ) : (
        <>
          <table>
            <tbody>
              <StatisticsLine text='good' value={good} />
              <StatisticsLine text='neutral' value={neutral} />
              <StatisticsLine text='bad' value={bad} />
              <StatisticsLine text='total' value={total} />
              <StatisticsLine text='average' value={average} />
              <StatisticsLine
                text='positive'
                value={`${positivePercentage}%`}
              />
            </tbody>
          </table>
        </>
      )}
    </>
  )
}
export default Statistics
