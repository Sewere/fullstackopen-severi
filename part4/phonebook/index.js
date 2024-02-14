const app = require('./app') // the actual Express application
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})


/*
const express = require('express')
var morgan = require('morgan')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')
const config = require('./utils/config')
const logger = require('./utils/logger')

//Order matters, error-middleware last
app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

morgan.token('req-body', (req) => JSON.stringify(req.body))

const customFormat = ':method :url :status :res[content-length] - :response-time ms :req[content-type] - :req-body'

app.use(morgan(customFormat, {
  stream: { write: (message) => logger.info(message.trim()) }
}))

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', async (request, response) => {
  logger.info(request)
  const persons = await Person.find({})
  const howMany = persons.length
  const timeOfRequest = new Date().toString()
  const page = `<p>The Phonebook has info of ${howMany} people</p>
  <br><p>The date of request: ${timeOfRequest}`
  response.send(page)
})

app.get('/api/persons', async (request, response) => {
  try {
    const persons = await Person.find({}).then(persons => {
      logger.info('tyypit: ', persons)
      response.json(persons)
    })
  } catch (error) {
    logger.error('Some kind of error happened', error)
    response.status(500).json({ error: 'Internal Server Error happened 4 real' })
  }
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    if(person) {
      response.json(person)
    }
    else {
      response.status(404).end()
    }
  })
})

app.post('/api/persons', async (request, response, next) => {
  const body = request.body
  if (!body.name) {
    logger.info("NO BODYYYY")
    return response.status(400).json({ error: 'No bodyy' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    id: body.id
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  logger.info("ID TO DESTROY:", request.params.id)
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      logger.info(`Person with id=${request.params.id} deleted`)
      response.status(204).end()
    })
    .catch(error => {
      logger.error("Well here we are")
      next(error)
    })
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body
  const updatedFields = { name, number }

  Person.findByIdAndUpdate(
    request.params.id,
    { $set: updatedFields },
    { new: true, runValidators: true, context: 'query' }
    )
    .then(updatedPerson => {
      if (updatedPerson) {
        response.json(updatedPerson)
      } else {
        response.status(404).json({ error: 'Person not found' })
      }
    })
    .catch(error => next(error))
})

/*
app.post('/api/persons', (request, response) => {
  const body = request.body
  logger.info(body)
  alreadyExists = persons.find(person => person.name == body.name)

  const errorMessage = !body.name
  ? 'Name is missing'
  : !body.number
  ? 'No number'
  : alreadyExists
  ? `The name ${body.name} already exists.`
  : null

  if (errorMessage) {
    return response.status(400).json({ error: errorMessage });
  }

  const person = {
    name: body.name,
    important: Boolean(body.important) || false,
    id: generateId(),
  }
  logger.info(person)
  persons = persons.concat(person)

  response.json(person)
})

//This one second last
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpointti' })
}
app.use(unknownEndpoint)

//This one last
const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message }) 
  }

  next(error)
}
app.use(errorHandler)

const PORT = config.PORT || 3001
  app.listen(PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

*/