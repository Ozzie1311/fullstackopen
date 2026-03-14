const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) throw new Error('Error fetching anecdotes')
  return await response.json()
}

export const saveAnecdoteInBackend = async (content) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: content, votes: 0 }),
  }
  const response = await fetch(baseUrl, options)
  if (!response.ok) throw new Error('Error saving anecdote in the backend')
  return await response.json()
}
