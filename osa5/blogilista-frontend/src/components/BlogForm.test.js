import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('<BlogForm />', () => {

  test('correct information is sent for createBlog function', async () => {
    const user = userEvent.setup()
    const createBlog = jest.fn()

    const { container } = render(<BlogForm createBlog={createBlog} />)

    const titleInput = container.querySelector('#title')
    const authorInput = container.querySelector('#author')
    const urlInput = container.querySelector('#url')
    const sendButton = screen.getByText('create')

    await user.type(titleInput, 'newtitle')
    await user.type(authorInput, 'newauthor')
    await user.type(urlInput, 'newurl')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toStrictEqual({
      title: 'newtitle',
      author: 'newauthor',
      url: 'newurl',
      likes: 0
    })
  })
})