import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()

  return (
    <>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => {
          dispatch(vote(anecdote.id))
          dispatch(showNotification(`you voted '${anecdote.content}'`))
        }}>vote</button>
      </div>
      <br></br>
    </>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return state.anecdotes
    }
    const filterToLower = state.filter.toLowerCase()
    return state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filterToLower.toLowerCase())
    )
  })

  return (
    <>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
        />
      ).sort((a1, a2) => a2.votes - a1.votes)}
    </>
  )
}

export default AnecdoteList