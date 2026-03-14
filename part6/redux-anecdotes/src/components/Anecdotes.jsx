import { useSelector, useDispatch } from 'react-redux'
import { addVote, setAnecdotes } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import { useEffect } from 'react'
import { getAnecdotes } from '../services/anecdote'

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
    getAnecdotes().then((anecdotes) => {
      dispatch(setAnecdotes(anecdotes))
    })
  }, [dispatch])

  const vote = (anecdote) => {
    dispatch(addVote(anecdote.id))
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
