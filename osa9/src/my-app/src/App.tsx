import Content from './components/Content'
import Header from './components/Header'
import Total from './components/Total'

interface CoursePartBase {
  name: string
  exerciseCount: number
  type: string
}

interface CourseDescription extends CoursePartBase {
  description: string
}

interface CourseNormalPart extends CourseDescription {
  type: 'normal'
}

interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject'
  groupProjectCount: number
}

interface CourseSubmissionPart extends CourseDescription {
  type: 'submission'
  exerciseSubmissionLink: string
}

interface CourseRequirements extends CourseDescription {
  type: 'requirements'
  requirements: string[]
}

export type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseRequirements

const App = () => {
  const courseName = 'Half Stack application development'
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is the easy course part',
      type: 'normal',
    },
    {
      name: 'Advanced',
      exerciseCount: 7,
      description: 'This is the hard course part',
      type: 'normal',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      type: 'groupProject',
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
      type: 'submission',
    },
    {
      name: 'Backend development',
      exerciseCount: 21,
      description: 'Typing the backend',
      requirements: ['node.js', 'jest'],
      type: 'requirements',
    },
  ]

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  )
}

export default App
