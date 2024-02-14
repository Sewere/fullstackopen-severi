const express = require('express')
const cors = require('cors')
const app = express()
//require('express-async-errors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const config = require('./utils/config')

const PORT = process.env.PORT || 27017
//const mongoUrl = 'mongodb://127.0.0.1/bloglist'
const urli = `mongodb://127.0.0.1:${PORT}/bloglist`
//mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
