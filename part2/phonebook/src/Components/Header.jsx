const Header = ({ filter, handleFilterChange }) => {
  return (
    <>
      <h1>Phonebook</h1>
      <div>
        filter shown with <input value={filter} onChange={handleFilterChange} />
      </div>
    </>
  )
}

export default Header
