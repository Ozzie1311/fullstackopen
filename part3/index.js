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

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
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
app.post('/api/persons', (req, res, next) => {
  const body = req.body
  console.log(req)

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'content missing' })
  }

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  })

  newPerson
    .save()
    .then((savedPerson) => {
      console.log(savedPerson, 'added succesfully')
      res.json(savedPerson)
    })
    .catch((error) => next(error))
})

//Get persons
app.get('/api/persons', (req, res) => {
  Person.find({}).then((person) => {
    res.json(person)
  })
})

//Get single person
app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findById(id)
    .then((findedPerson) => {
      res.json(findedPerson)
    })
    .catch((error) => next(error))
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

//Update single person
app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body
  const id = req.params.id

  const newPerson = {
    name,
    number,
  }

  Person.findByIdAndUpdate(id, newPerson, { new: true })
    .then((updatedPerson) => {
      res.json(updatedPerson)
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
