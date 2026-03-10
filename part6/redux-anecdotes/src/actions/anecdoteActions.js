const addVote = (parameterID) => {
  return { type: 'ADD_VOTE', payload: { id: parameterID } }
}

const createAnecdote = (content) => {
  return {
    type: 'ADD_ANECDOTE',
    payload: {
      content,
      votes: 0,
    },
  }
}

const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    payload: filter,
  }
}

export { addVote, createAnecdote, setFilter }
