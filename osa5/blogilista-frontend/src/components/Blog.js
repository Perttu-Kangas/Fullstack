import React, { useState } from 'react'

const Blog = ({ blog, likeBlog, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  //console.log(blog)

  return (
    <div className="blog" style={blogStyle}>
      {visible ?
        <div>
          {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button>
          <br></br>
          {blog.url}
          <br></br>
          {blog.likes} <button onClick={() => likeBlog(blog)}>like</button>
          <br></br>
          {blog.user.name}
          <br></br>
          {
            user !== null && blog.user.username === user.username ?
              <button onClick={() => deleteBlog(blog)}>remove</button>
              : <></>
          }
        </div>
        :
        <div>
          {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
        </div>
      }
    </div>
  )
}

export default Blog