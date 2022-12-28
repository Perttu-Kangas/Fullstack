const router = require('express').Router();

let visits = 0

router.get('/', async (req, res) => {
  visits++

  res.send({
    visits
  });
})

module.exports = router