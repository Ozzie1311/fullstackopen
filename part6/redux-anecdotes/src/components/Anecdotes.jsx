import { useSelector, useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { useEffect } from 'react'
import { initializeAnecdotes, updateVotes } from '../reducers/anecdoteReducer'

const Anecdotes = () => {
  const anecdotesList = useSelector(({ anecdotes, filter }) => {
    const filtered = filter
      ? anecdotes.filter((a) =>
          a.content.toLowerCase().includes(filter.toLowerCase()),
        )
      : anecdotes

    return [...filtered].sort((a, b) => b.votes - a.votes)
  })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  const vote = (anecdote) => {
    dispatch(updateVotes(anecdote))
    dispatch(showNotification(`You vote for ${anecdote.content}`, 3))
  }

  return (
    <div>
      {anecdotesList.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Anecdotes
