import { createSlice } from '@reduxjs/toolkit'
import {
  getAnecdotes,
  saveAnecdoteInBackend,
  updateVotesInBackend,
} from '../services/anecdote'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addAnecdote(state, action) {
      const content = action.payload
      state.push(content)
    },
    addVote(state, action) {
      const anecdoteToChange = state.find((a) => a.id === action.payload.id)
      if (anecdoteToChange) {
        anecdoteToChange.votes = action.payload.votes
      }
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

const { addAnecdote, setAnecdotes, addVote } = anecdoteSlice.actions

export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await getAnecdotes()
  dispatch(setAnecdotes(anecdotes))
}

export const appendAnecdotes = (content) => async (dispatch) => {
  const newAnecdote = await saveAnecdoteInBackend(content)
  dispatch(addAnecdote(newAnecdote))
}

export const updateVotes = (content) => async (dispatch) => {
  const updatedAnecdote = await updateVotesInBackend(
    content.id,
    content.votes + 1,
  )
  dispatch(addVote(updatedAnecdote))
}

export default anecdoteSlice.reducer
