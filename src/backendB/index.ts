import express = require('express')
import { calculateBmi } from './bmiCalculator'
import {
  calculateExercises,
  parseArgumentsExercise,
} from './exerciseCalculator'

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

app.get('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!req.body || !req.body.daily_exercises || !req.body.target) {
    return res.status(400).send({ error: 'parameters missing' })
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body

  if (!daily_exercises || !target) {
    return res.status(400).send({ error: 'parameters missing' })
  }
  if (isNaN(Number(target))) {
    return res.status(400).send({ error: 'malformatted parameters' })
  }
  try {
    return res.json(
      calculateExercises(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        parseArgumentsExercise(daily_exercises),
        Number(target)
      )
    )
  } catch (error: unknown) {
    return res.status(400).send({ error: 'malformatted parameters' })
  }
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
