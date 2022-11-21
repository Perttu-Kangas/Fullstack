require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

// Test run actions

const app = express()

app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

app.use(cors())

app.get('/health', (req, res) => {
  res.send('ok')
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons)
  })
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number missing',
    })
  }

  const personObject = new Person({
    name: body.name,
    number: body.number,
  })

  personObject
    .save()
    .then((savedPerson) => {
      res.json(savedPerson)
    })
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(req.params.id)
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => {
      next(error)
    })
})

app.delete('/api/persons/:id', (req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(req.params.id)
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

app.get('/info', (req, res) => {
  Person.find({})
    .count()
    .then((count) => {
      res.send(`Phonebook has info for ${count} people. <br>` + new Date())
    })
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number missing',
    })
  }

  const personObject = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(req.params.id, personObject, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedPerson) => {
      res.json(updatedPerson)
    })
    .catch((error) => next(error))
})

const errorHandler = (error, request, response, next) => {
  // eslint-disable-next-line no-console
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.code === 11000) {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`)
})