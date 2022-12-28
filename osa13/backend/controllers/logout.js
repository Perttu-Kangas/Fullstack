const router = require('express').Router()
const { Session, User } = require('../models')
const { tokenExtractor } = require("../util/middleware")


router.delete('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const session = await Session.findOne({
    where: {
      userId: user.id
    }
  })
  await session.destroy()
  res.status(200).end()
})

module.exports = router