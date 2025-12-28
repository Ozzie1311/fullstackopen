import Header from './Header.jsx'
import Votes from './Votes.jsx'
import Button from './Button.jsx'
import MostVoted from './MostVoted.jsx'
import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const totalVotes = Math.max(...votes)
  const findAnecdote = votes.indexOf(totalVotes)
  const winnerAnecdote = anecdotes[findAnecdote]

  const handleVotes = () => {
    const stateCopy = [...votes]
    stateCopy[selected] += 1
    setVotes(stateCopy)
  }

  const generateRandomAnecdote = () => {
    const randomAnecdote = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomAnecdote)
  }

  return (
    <div>
      <Header anecdotes={anecdotes} selected={selected} />
      <Votes votes={votes} selected={selected} />
      <Button text='Vote' handleClick={handleVotes} />
      <Button text='Generate' handleClick={generateRandomAnecdote} />
      <MostVoted totalVotes={totalVotes} winnerAnecdote={winnerAnecdote} />
    </div>
  )
}

export default App
