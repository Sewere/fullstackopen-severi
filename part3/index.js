const express = require('express')
var morgan = require('morgan')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const baseUrl = '/api/notes'
const Person = require('./models/person')

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())

morgan.token('req-body', (req) => JSON.stringify(req.body));

const customFormat = ':method :url :status :res[content-length] - :response-time ms :req[content-type] - :req-body';

app.use(morgan(customFormat, {
  stream: { write: (message) => console.log(message.trim()) }
}))

let persons = [
  { 
    id: 1,
    name: "Arto Hellas", 
    number: "040-123456"
  },
  { 
    id: 2,
    name: "Ada Lovelace", 
    number: "39-44-5323523"
  },
  { 
    id: 3,
    name: "Dan Abramov", 
    number: "12-43-234345"
  },
  { 
    id: 4,
    name: "Mary Poppendieck", 
    number: "39-23-6423122"
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
  console.log(request)
  const howMany = persons.length
  const timeOfRequest = new Date().toString()
  const page = `<p>The Phonebook has info of ${howMany} people</p>
  <br><p>The date of request: ${timeOfRequest}`
  response.send(page)
})

/*
app.get('/api/persons', (request, response) => {
  response.json(persons)
})*/
app.get('/api/persons', async (request, response) => {
  try {
    const persons = await Person.find({}).then(persons => {
      console.log("tyypit: ", persons)
      response.json(persons)
    })
  } catch (error) {
    console.log("Some kind of error happened", error)
    response.status(500).json({ error: 'Internal Server Error happened 4 real' })
  }
})
/*
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if(person) {
    response.json(person)
  }
  else {
      response.status(404).end()
  }
})*/
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


const generateId = () => {
  const randID = Math.floor(Math.random() * 100000)
  return randID
}

app.post('/api/persons', async (request, response) => {
  const body = request.body
  if (!body.name) {
    console.log("NO BODYYYY")
    return response.status(400).json({ error: 'No bodyy' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    id: generateId()
  })

  try {
    const savedPerson = await person.save()
    response.json(savedPerson)
  } catch (error) {
    console.error(error)
    response.status(500).json({ error: 'Womp womp' });
  }
})
/*
app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log(body)
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
  console.log(person)
  persons = persons.concat(person)

  response.json(person)
})*/

const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})