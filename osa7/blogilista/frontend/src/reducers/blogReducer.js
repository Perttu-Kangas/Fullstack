import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const byLikes = (b1, b2) => b2.likes - b1.likes
const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
    likeBlogId(state, action) {
      const id = action.payload
      const blogToChange = state.find(n => n.id === id)
      const changedBlog = { ...blogToChange, likes: blogToChange.likes + 1 }
      return state.map(blog => blog.id !== id ? blog : changedBlog)
        .sort(byLikes)
    },
    removeBlogId(state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
        .sort(byLikes)
    }
  }
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs.sort(byLikes)))
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(addBlog(newBlog))
  }
}

export const { setBlogs, addBlog, likeBlogId, removeBlogId } = blogSlice.actions
export default blogSlice.reducer