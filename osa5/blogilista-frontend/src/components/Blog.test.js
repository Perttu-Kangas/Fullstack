import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'Title',
  url: 'someurl.com',
  author: 'Author',
  likes: 2,
  user: {
    name: 'User Name',
    username: 'username'
  }
}

const user = {
  username: 'username',
  name: 'User Name'
}

describe('<Blog />', () => {

  const likeBlog = jest.fn()
  const deleteBlog = jest.fn()

  beforeEach(() => {
    render(
      <Blog
        blog={blog}
        likeBlog={likeBlog}
        deleteBlog={deleteBlog}
        user={user}
      />
    )
  })

  test('renders content', async () => {
    const element = await screen.findByText(`${blog.title} ${blog.author}`)
    expect(element).toBeDefined()
  })

  test('does not render additional info before click', async () => {
    expect(screen.queryByText(`${blog.title}`)).toBeDefined()
    expect(screen.queryByText(`${blog.author}`)).toBeDefined()
    expect(screen.queryByText(`${blog.url}`)).toEqual(null)
    expect(screen.queryByText(`${blog.likes}`)).toEqual(null)
  })

  test('additional info button works', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(screen.queryByText(`${blog.title}`)).toBeDefined()
    expect(screen.queryByText(`${blog.author}`)).toBeDefined()
    expect(screen.queryByText(`${blog.url}`)).toBeDefined()
    expect(screen.queryByText(`${blog.likes}`)).toBeDefined()
  })

  test('clicking like twice calls event handler twice', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(likeBlog.mock.calls).toHaveLength(2)
  })
})