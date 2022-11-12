import express = require('express')
import { calculateBmi } from './bmiCalculator'

const app = express()

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  if (
    !req.query ||
    !req.query.height ||
    !req.query.weight ||
    isNaN(Number(req.query.height)) ||
    isNaN(Number(req.query.weight))
  ) {
    return res.send({ error: 'malformatted parameters' })
  }
  try {
    return res.json({
      ...req.query,
      bmi: calculateBmi(Number(req.query.height), Number(req.query.weight)),
    })
  } catch (error: unknown) {
    return res.send({ error: 'malformatted parameters' })
  }
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
