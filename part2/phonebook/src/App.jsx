import Header from './Components/Header'
import Form from './Components/Form'
import Numbers from './Components/Numbers'

import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const hook = () => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data)
    })
  }
  useEffect(hook, [])

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
