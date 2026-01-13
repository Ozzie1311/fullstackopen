require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/number')
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

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (body.name === undefined || body.number === undefined) {
    return res.status(404).json({ error: 'content missing' })
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

app.get('/api/persons', (req, res) => {
  Person.find({}).then((person) => {
    res.json(person)
  })
})

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
