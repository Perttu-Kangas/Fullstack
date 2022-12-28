
const jwt = require('jsonwebtoken')
const logger = require('./logger')
const { SECRET } = require('./config')
const { Session, User } = require('../models')

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'invalid token'
    })
  } else if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: error.errors[0].message })
  }

  next(error)
}

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      const token = authorization.substring(7)
      req.decodedToken = jwt.verify(token, SECRET)

      const session = await Session.findOne({ where: { token } })

      if (!session) {
        return res.status(401).json({ error: 'session not found' })
      }

      const user = await User.findByPk(session.userId)
      if (user.disabled) {
        return res.status(403).json({ error: 'user is disabled' })
      }

    } catch (error) {
      logger.error(error)
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}


module.exports = {
  errorHandler, tokenExtractor
}