import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdoteVote } from './requests'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const App = () => {
  const { notification, dispatch } = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
  })

  const updateVoteMutation = useMutation({
    mutationFn: updateAnecdoteVote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['anecdotes'] }),
  })

  const notify = (message) => {
    dispatch({ type: 'SET', payload: message })
    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, 5000)
  }

  const handleVote = (anecdote) => {
    updateVoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    notify(`You has voted for ${anecdote.content}`)
  }

  if (result.isLoading) {
    return <div>Loading anecdotes...</div>
  }

  if (result.isError) {
    return <div>We are experimenting some problems...404</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
