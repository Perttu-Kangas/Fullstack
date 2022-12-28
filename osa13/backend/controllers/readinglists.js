const router = require('express').Router()
const { User, ReadingLists } = require('../models')
const { tokenExtractor } = require("../util/middleware")
const { sequelize } = require('../util/db')

router.post('/', async (req, res) => {
  const reading = await ReadingLists.create(req.body)
  res.json(reading)
})

router.put('/:id', tokenExtractor, async (req, res) => {

  const reading = await ReadingLists.findByPk(req.params.id)
  if (!reading) {
    return res.status(404).end()
  }

  const user = await User.findByPk(req.decodedToken.id)
  if (user.id !== reading.userId) {
    return res.status(401).end()
  }

  reading.read = req.body.read
  await reading.save()
  res.json(reading)
})

module.exports = router