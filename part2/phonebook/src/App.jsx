import Header from './Components/Header'
import Form from './Components/Form'
import Numbers from './Components/Numbers'
import phoneService from './Services/phonenumbers'

import { useState, useEffect } from 'react'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const hook = () => {
    phoneService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }
  useEffect(hook, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const personToEdit = persons.find((person) => person.name === newName)

    if (personToEdit) {
      if (
        confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const edditedObject = { ...personToEdit, number: newNumber }
        phoneService
          .update(personToEdit.id, edditedObject)
          .then((returnedPerson) => {
            console.log('lo que devuelve la consola', returnedPerson)
            setPersons(
              persons.map((person) =>
                person.id !== personToEdit.id ? person : returnedPerson
              )
            )
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      const newPersonObject = {
        name: newName,
        number: newNumber,
      }

      phoneService.create(newPersonObject).then((createdNote) => {
        setPersons([...persons, createdNote])
        setNewName('')
        setNewNumber('')
      })
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

  const deletePhone = (id) => {
    const findUser = persons.find((person) => person.id === id)
    if (confirm(`Are you sure to delete ${findUser.name} number?`)) {
      console.log('Número eliminado')
      phoneService.deletePhone(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id))
      })
    } else {
      console.log('Número no encontrado')
    }
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
      <Numbers personsToShow={personsToShow} deletePhone={deletePhone} />
    </div>
  )
}

export default App
