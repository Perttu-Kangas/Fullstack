import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import blogs from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({ error: false, notification: null });
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  const handleMessage = (error, notification) => {
    setNotification({ error, notification });
    setTimeout(() => {
      setNotification({ error: false, notification: null });
    }, 5000);
  };

  const updateBlogs = async () => {
    const blogs = await blogService.getAll()
    blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
    setBlogs( blogs )
  }

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
      setBlogs( blogs )
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      setUsername('')
      setPassword('')
    } catch (exception) {
      handleMessage(true, 'wrong username or password')
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const createBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        handleMessage(false, `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      })
  }

  const likeBlog = (blogToLike) => {
    //console.log(blogToLike)
    blogService.likeBlog({
      id: blogToLike.id,
      user: blogToLike.user.id,
      likes: blogToLike.likes + 1,
      author: blogToLike.author,
      title: blogToLike.title,
      url: blogToLike.url,
    }).then(() => {
      updateBlogs()
    })
  }

  const deleteBlog = (blogToDelete) => {
    if (window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}`)) {
      blogService
        .deleteBlog(blogToDelete)
        .then((response) => {
          //console.log(response);
          setBlogs(blogs.filter((filter) => filter.id !== blogToDelete.id));
          handleMessage(false, `Removed ${blogToDelete.title} by ${blogToDelete.author}`);
        })
        .catch((error) => {
          handleMessage(
            true,
            `Information of ${blogToDelete.title} has been removed from server`
          );
          setBlogs(blogs.filter((filter) => filter.id !== blogToDelete.id));
        });
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification.notification} error={notification.error} />

      {user === null ?
        <Togglable buttonLabel="login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable> :
        <div>
          <form onSubmit={handleLogout}>
            {user.name} logged in <button type="submit">logout</button>
          </form>
          <br></br>
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          <br></br>
        </div>
      }

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} user={user} />
      )}
    </div>
  )
}

export default App
