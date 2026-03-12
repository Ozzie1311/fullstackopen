import deepFreeze from 'deep-freeze'
import { describe, test, expect } from 'vitest'
import anecdoteReducer from '../reducers/anecdoteReducer'

describe('anecdoteReducer', () => {
  test('returns new state with action anecdote/addAnecdote', () => {
    const state = []
    const action = {
      type: 'anecdote/addAnecdote',
      payload: 'the app state is in redux store',
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState.map((a) => a.content)).toContainEqual(action.payload)
  })
})
