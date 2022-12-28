
const app = require('./app')
const { PORT } = require('./util/config')
const logger = require('./util/logger')
const { connectToDatabase } = require('./util/db')

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
  })
}

start()