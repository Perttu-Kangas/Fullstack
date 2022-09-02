import { useEffect, useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/user'

import { notification } from './reducers/notificationReducer'
import { initializeBlogs, addBlog, likeBlogId, removeBlogId } from './reducers/blogReducer'
import { setUser, clearUser } from './reducers/userReducer'

const App = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  useEffect(() => {
    const userFromStorage = userService.getUser()
    if (userFromStorage) {
      dispatch(setUser(userFromStorage))
    }
  }, [])

  const login = async (username, password) => {
    loginService.login({
      username, password,
    }).then(user => {

      dispatch(setUser(user))
      userService.setUser(user)

      dispatch(notification({ notification: `${user.name} logged in!`, time: 5, type: 'info' }))
    }).catch(() => {
      dispatch(notification({ notification: 'wrong username/password', time: 5, type: 'alert' }))
    })
  }

  const logout = () => {
    dispatch(clearUser())
    userService.clearUser()
    dispatch(notification({ notification: 'good bye!', time: 5, type: 'info' }))
  }

  const createBlog = async (blog) => {
    blogService.create(blog).then(createdBlog => {
      dispatch(notification({ notification: `a new blog '${createdBlog.title}' by ${createdBlog.author} added`, time: 5, type: 'info' }))
      dispatch(addBlog(createdBlog))
      blogFormRef.current.toggleVisibility()
    }).catch(error => {
      dispatch(notification({ notification: 'creating a blog failed: ' + error.response.data.error, time: 5, type: 'alert' }))
    })
  }

  const removeBlog = (id) => {
    const toRemove = blogs.find(b => b.id === id)

    const ok = window.confirm(`remove '${toRemove.title}' by ${toRemove.author}?`)

    if (!ok) {
      return
    }

    blogService.remove(id).then(() => {
      dispatch(removeBlogId(id))
    })
  }

  const likeBlog = async (id) => {
    const toLike = blogs.find(b => b.id === id)
    const liked = {
      ...toLike,
      likes: (toLike.likes || 0) + 1,
      user: toLike.user.id
    }

    blogService.update(liked.id, liked).then(updatedBlog => {
      dispatch(notification({ notification: `you liked '${updatedBlog.title}' by ${updatedBlog.author}`, time: 5, type: 'info' }))
      dispatch(likeBlogId(liked.id))
    })
  }

  if (user === null) {
    return <>
      <Notification notification={notification} />
      <LoginForm onLogin={login} />
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

      <Togglable buttonLabel='new note' ref={blogFormRef}>
        <NewBlogForm
          onCreate={createBlog}
        />
      </Togglable>

      <div id='blogs'>
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likeBlog}
            removeBlog={removeBlog}
            user={user}
          />
        )}
      </div>
    </div>
  )
}

export default App