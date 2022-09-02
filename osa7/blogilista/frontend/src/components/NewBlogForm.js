import { useState, useRef } from 'react'

import { useDispatch } from 'react-redux'

import Togglable from '../components/Togglable'

import blogService from '../services/blogs'

import { notification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogReducer'

const NewBlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog({ title, author, url, likes: 0 })
    setAuthor('')
    setTitle('')
    setUrl('')
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

  return (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <div>
        <h2>Create new</h2>

        <form onSubmit={handleSubmit}>
          <div>
            title
            <input
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              id='title'
              placeholder='title of the blog'
            />
          </div>
          <div>
            author
            <input
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
              id='author'
              placeholder='author of the blog'
            />
          </div>
          <div>
            url
            <input
              value={url}
              onChange={({ target }) => setUrl(target.value)}
              id='url'
              placeholder='url of the blog'
            />
          </div>
          <button id='create-butto' type='submit'>
            create
          </button>
        </form>
      </div>
    </Togglable>
  )
}

export default NewBlogForm