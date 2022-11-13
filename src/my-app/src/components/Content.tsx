import { CoursePart } from '../App'
import Part from './Part'

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map((p) => {
        return <Part key={p.name} part={p} />
      })}
    </>
  )
}

export default Content
