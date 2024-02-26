const express = require('express')
const cors = require('cors')
const app = express()
//require('express-async-errors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const config = require('./utils/config')

const urli = 'mongodb://127.0.0.1/bloglist'
//const urli = `mongodb://127.0.0.1:${PORT}/bloglist`
//mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
//logger.info('connecting to', config.MONGODB_URI)
logger.info('connecting to', urli)
mongoose.connect(urli)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
app.use(middleware.requestLogger)

app.use('/', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

//npm run start:test
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
