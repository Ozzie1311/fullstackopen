const MostVoted = ({ totalVotes, winnerAnecdote }) => {
  return (
    <>
      {totalVotes !== 0 && (
        <div>
          <h2>Anecdote with most votes</h2>
          <p>{winnerAnecdote}</p>
          <p>has {totalVotes} votes</p>
        </div>
      )}
    </>
  )
}

export default MostVoted
