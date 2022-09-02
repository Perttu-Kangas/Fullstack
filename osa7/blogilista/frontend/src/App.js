import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'

import userService from './services/user'

import { notification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setUser, clearUser } from './reducers/userReducer'

import {
  Routes,
  Route,
  Link,
  useMatch
} from 'react-router-dom'

const Menu = ({ user, logout }) => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      {user.name} logged in
      <button onClick={logout}>logout</button>
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)

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

  const users = useSelector(state => state.users)

  const match = useMatch('/users/:id')
  const someUser = match
    ? users.find(a => a.id === match.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  const someBlog = blogMatch
    ? blogs.find(a => a.id === blogMatch.params.id)
    : null

  if (user === null) {
    return <>
      <Notification />
      <LoginForm />
    </>
  }

  return (
    <div>
      <Menu user={user} logout={logout} />
      <Notification />

      <Routes>
        <Route path="/blogs/:id" element={<Blog blog={someBlog} />} />
        <Route path="/" element={
          <>
            <h2>blogs</h2>
            <NewBlogForm />
            <BlogList />
          </>
        } />
        <Route path="/users/:id" element={<User user={someUser} />} />
        <Route path="/users" element={
          <>
            <h2>Users</h2>
            <UserList />
          </>
        } />
      </Routes>
    </div>
  )
}

export default App