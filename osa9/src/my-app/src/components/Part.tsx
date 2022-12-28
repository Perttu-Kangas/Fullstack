import { CoursePart } from '../App'

const Part = ({ part }: { part: CoursePart }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
  }

  switch (part.type) {
    case 'normal':
      return (
        <>
          <h4>
            {part.name} {part.exerciseCount}
          </h4>
          <p>{part.description}</p>
        </>
      )
    case 'groupProject':
      return (
        <>
          <h4>
            {part.name} {part.exerciseCount}
          </h4>
          <p>project exercises {part.groupProjectCount}</p>
        </>
      )
    case 'submission':
      return (
        <>
          <h4>
            {part.name} {part.exerciseCount}
          </h4>
          <p>{part.description}</p>
          <p>submit to {part.exerciseSubmissionLink}</p>
        </>
      )
    case 'requirements':
      return (
        <>
          <h4>
            {part.name} {part.exerciseCount}
          </h4>
          <p>{part.description}</p>
          <p>required skills: {part.requirements.join(', ')}</p>
        </>
      )
    default:
      return assertNever(part)
  }
}

export default Part
