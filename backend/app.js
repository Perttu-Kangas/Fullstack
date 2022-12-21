const express = require('express')
const app = express()
require('express-async-errors')

const { errorHandler } = require('./util/middleware')

const blogsRouter = require('./controllers/blogs')

app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.use(errorHandler)

module.exports = app