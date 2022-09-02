import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import blogService from '../services/blogs'

import { notification } from '../reducers/notificationReducer'
import { likeBlogId, removeBlogId, commentBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {

  if (!blog) {
    return <></>
  }

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const [comment, setComment] = useState('')

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

  const handleSubmit = (event) => {
    event.preventDefault()
    if (comment !== '') {
      commentBlogs(blog.id)
      setComment('')
    }
  }

  const commentBlogs = async (id) => {
    blogService.comment(id, comment).then(() => {
      dispatch(commentBlog({ id, comment }))
    })
  }

  const addedBy = blog.user && blog.user.name ? blog.user.name : 'anonymous'
  const own = blog.user.id === user.id

  return (
    <div>
      <h1>{blog.title} {blog.author}</h1>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes <button onClick={() => likeBlog(blog.id)}>like</button>
      </div>
      added by {addedBy}
      {own && <button onClick={() => removeBlog(blog.id)}>
        remove
      </button>}
      <h3>comments</h3>
      <ul>
        {blog.comments.map(comment =>
          <li key={comment}>{comment}</li>
        )}
      </ul>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            id='comment'
            placeholder='comment the blog'
          />
          <button id='add-button' type='submit'>
            add comment
          </button>
        </div>
      </form>
    </div>
  )
}

export default Blog