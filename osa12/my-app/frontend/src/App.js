
import { useState, useEffect } from 'react'
import indexService from './services/index'

const App = () => {
  const [visits, setVisits] = useState(0)

  useEffect(() => {
    indexService.getVisits().then(visits => {
      setVisits(visits)
    })
  }, [])

  return (
    <div>
      <p>visits: {visits}</p>
    </div>
  )
}


export default App