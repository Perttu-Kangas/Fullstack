interface Exercises {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

export const parseArgumentsExercise = (args: Array<string>): Array<number> => {
  if (!args || args.length < 3) throw new Error('Not enough arguments')

  const exerciseDays: Array<number> = []

  for (let i = 2; i < args.length; i++) {
    if (!isNaN(Number(args[i]))) {
      exerciseDays.push(Number(args[i]))
      continue
    }
    throw new Error('Provided values were not numbers!')
  }
  return exerciseDays
}

const calculateAverage = (numberList: Array<number>): number => {
  return numberList.reduce((a, b) => a + b, 0) / numberList.length
}

export const calculateExercises = (
  exerciseDays: Array<number>,
  target: number
): Exercises => {
  const avg = calculateAverage(exerciseDays)

  let rating
  let ratingDescription
  if (avg < target) {
    rating = 1
    ratingDescription = 'go gym'
  } else if (avg > target * 2) {
    rating = 3
    ratingDescription = 'goes to gym'
  } else {
    rating = 2
    ratingDescription = 'has been in gym'
  }

  return {
    periodLength: exerciseDays.length,
    trainingDays: exerciseDays.filter((i) => i > 0).length,
    success: avg > target,
    rating,
    ratingDescription,
    target,
    average: avg,
  }
}

try {
  console.log(calculateExercises(parseArgumentsExercise(process.argv), 2))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}
