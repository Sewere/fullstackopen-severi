const personRouter = require('express').Router()
const Person = require('../models/person.js')


personRouter.get('/info', async (request, response) => {
  logger.info(request)
  const persons = await Person.find({})
  const howMany = persons.length
  const timeOfRequest = new Date().toString()
  const page = `<p>The Phonebook has info of ${howMany} people</p>
  <br><p>The date of request: ${timeOfRequest}`
  response.send(page)
})

personRouter.get('/api/persons', async (request, response) => {
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

personRouter.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    if(person) {
      response.json(person)
    }
    else {
      response.status(404).end()
    }
  })
})

personRouter.post('/api/persons', async (request, response, next) => {
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
    response.status(201).json(savedPerson)
  })
  .catch(error => next(error))
})

personRouter.delete('/api/persons/:id', (request, response, next) => {
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

personRouter.put('/api/persons/:id', (request, response, next) => {
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

personRouter.get('/', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
})

personRouter.get('/:id', (request, response, next) => {
Person.findById(request.params.id)
    .then(person => {
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
    })
    .catch(error => next(error))
})

personRouter.post('/', (request, response, next) => {
    const body = request.body

    const person = new Person({
        name: body.name,
        number: body.number || false,
    })

    person.save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(error => next(error))
})

personRouter.delete('/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(() => {
        response.status(204).end()
        })
        .catch(error => next(error))
})

personRouter.put('/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
    }

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

module.exports = personRouter