const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

const portti= 27017
app.listen(/*config.PORT*/portti, () => {
  logger.info(`Server running on port ${config.PORT}`)
})