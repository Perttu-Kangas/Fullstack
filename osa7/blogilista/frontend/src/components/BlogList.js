import { useDispatch, useSelector } from 'react-redux'

import Blog from './Blog'

import blogService from '../services/blogs'

import { notification } from '../reducers/notificationReducer'
import { likeBlogId, removeBlogId } from '../reducers/blogReducer'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

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

  return <div id='blogs'>
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
}

export default BlogList