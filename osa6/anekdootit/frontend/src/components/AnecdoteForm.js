
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.notification({ notification: `added anecdote '${content}'`, time: 5 })
  }

  return (
    <>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
      <br></br>
    </>
  )
}

export default connect(
  null,
  { createAnecdote, notification }
)(AnecdoteForm)