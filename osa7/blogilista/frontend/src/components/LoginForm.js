import { useState } from 'react'

import { useDispatch } from 'react-redux'

import loginService from '../services/login'

import { notification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    login(username, password)
  }

  const login = async (username, password) => {
    loginService.login({
      username, password,
    }).then(user => {
      dispatch(setUser(user))
      dispatch(notification({ notification: `${user.name} logged in!`, time: 5, type: 'info' }))
    }).catch(() => {
      dispatch(notification({ notification: 'wrong username/password', time: 5, type: 'alert' }))
    })
  }

  return (
    <div>
      <h2>Log in to application</h2>

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            id='username'
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            id="password"
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm