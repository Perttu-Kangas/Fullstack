import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'

import userService from './services/user'

import { notification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser, clearUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const user = useSelector(state => state.user)

  useEffect(() => {
    const userFromStorage = userService.getUser()
    if (userFromStorage) {
      dispatch(setUser(userFromStorage))
    }
  }, [])

  const logout = () => {
    dispatch(clearUser())
    dispatch(notification({ notification: 'good bye!', time: 5, type: 'info' }))
  }

  if (user === null) {
    return <>
      <Notification />
      <LoginForm />
    </>
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>

      <NewBlogForm />

      <BlogList />
    </div>
  )
}

export default App