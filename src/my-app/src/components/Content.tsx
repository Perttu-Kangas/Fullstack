import { CoursePart } from '../App'

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map((p) => {
        return (
          <p>
            {p.name} {p.exerciseCount}
          </p>
        )
      })}
    </>
  )
}

export default Content
