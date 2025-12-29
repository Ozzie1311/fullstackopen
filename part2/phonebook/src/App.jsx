import Header from './Components/Header'
import Form from './Components/Form'
import Numbers from './Components/Numbers'

import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '0424-000-5555',
      id: 1,
    },
  ])
  const [newName, setNewName] = useState('Ada Lovelace')
  const [newNumber, setNewNumber] = useState('0424-333-5558')
  const [filter, setFilter] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const alreadyExists = persons.some((person) => person.name === newName)

    if (alreadyExists) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      return
    } else {
      const newPersonObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
      setPersons([...persons, newPersonObject])
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow =
    filter === ''
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )

  return (
    <div>
      <Header filter={filter} handleFilterChange={handleFilterChange} />
      <Form
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <Numbers personsToShow={personsToShow} />
    </div>
  )
}

export default App
