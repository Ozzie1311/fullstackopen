require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Person = require('./models/number')

const app = express()

const requestLogger = (req, res, next) => {
  console.log('Method', req.method)
  console.log('Path', req.path)
  console.log('Body', req.body)
  console.log('---')
  next()
}

const errorHandler = (error, req, res, next) => {
  console.log(error.message)

  if (error.message === 'CastError') {
    return req.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}
//-- Some middlewares -- //
app.use(express.json())
app.use(express.static('dist'))
app.use(cors())
app.use(requestLogger)

// -- Routes -- //

// Create person
app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'content missing' })
  }

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  })

  newPerson.save().then((savedPerson) => {
    console.log(savedPerson, 'added succesfully')
    res.json(savedPerson)
  })
})

//Get persons
app.get('/api/persons', (req, res) => {
  Person.find({}).then((person) => {
    res.json(person)
  })
})

//Delete single person
app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findByIdAndDelete(id)
    .then((result) => {
      return res.status(204).end()
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (req, res, next) => {
  return res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)

// app.post('/api/persons', (request, response) => {
//   const body = request.body

//   if (!body.name || !body.number) {
//     return response.status(400).json({
//       error: 'Number or name missing',
//     })
//   }

//   const personExists = phonebook.find((person) => person.name === body.name)

//   if (personExists) {
//     return response.status(400).json({
//       error: 'name must be unique',
//     })
//   }

//   const newPerson = {
//     id: generateRandomNumber(),
//     name: body.name,
//     number: body.number,
//   }

//   phonebook = [...phonebook, newPerson]

//   response.json(newPerson)
// })

// app.get('/api/persons', (request, response) => {
//   response.json(phonebook)
// })

// app.get('/info', (request, response) => {
//   const date = new Date()
//   response.send(`
//             <div>
//                 <p>Phonebook has info for ${phonebook.length} people</p>
//                 <p>${date}</p>
//             </div>
//         `)
// })

// app.get('/api/persons/:id', (request, response) => {
//   const id = Number(request.params.id)
//   const person = phonebook.find((p) => p.id === id)

//   if (person) {
//     response.json(person)
//   } else {
//     response.status(404).end()
//   }
// })

// app.delete('/api/persons/:id', (request, response) => {
//   const id = Number(request.params.id)
//   phonebook = phonebook.filter((p) => p.id !== id)
//   response.status(204).end()
// })
