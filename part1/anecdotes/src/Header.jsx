const Header = ({ anecdotes, selected }) => {
  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
    </>
  )
}

export default Header
