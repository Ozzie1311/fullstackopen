const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const cors = require('cors')
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

let phonebook = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

const generateRandomNumber = () => {
  return Math.floor(Math.random() * 1000000)
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'Number or name missing',
    })
  }

  const personExists = phonebook.find((person) => person.name === body.name)

  if (personExists) {
    return response.status(400).json({
      error: 'name must be unique',
    })
  }

  const newPerson = {
    id: generateRandomNumber(),
    name: body.name,
    number: body.number,
  }

  phonebook = [...phonebook, newPerson]

  response.json(newPerson)
})

app.get('/api/persons', (request, response) => {
  response.json(phonebook)
})

app.get('/info', (request, response) => {
  const date = new Date()
  response.send(`
            <div>
                <p>Phonebook has info for ${phonebook.length} people</p>
                <p>${date}</p>
            </div>
        `)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = phonebook.find((p) => p.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  phonebook = phonebook.filter((p) => p.id !== id)
  response.status(204).end()
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
