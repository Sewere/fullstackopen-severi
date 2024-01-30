const express = require('express')
var morgan = require('morgan')
const app = express()
const cors = require('cors')
const baseUrl = '/api/notes'

app.use(express.json())
app.use(express.static('dist'))

morgan.token('req-body', (req) => JSON.stringify(req.body));

const customFormat = ':method :url :status :res[content-length] - :response-time ms :req[content-type] - :req-body';

app.use(morgan(customFormat, {
  stream: { write: (message) => console.log(message.trim()) }
}))

app.use(cors())

let notes = [
    {   id: 1,
        content: "HTML is easy",
        important: true
    },
    {   id: 2,
        content: "Browser can execute only JavaScript",
        important: false
    },
    {   id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

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

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id ===id)
  if(person) {
    response.json(person)
  }
  else {
      response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id ===id)

  response.status(204).end()
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    
    if (note) {
        response.json(note)
    }
    else {
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
})

const generateId = () => {
  const randID = Math.floor(Math.random() * 100000)
  return randID
}

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
})

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})

const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})