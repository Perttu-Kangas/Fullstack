import React from 'react'
import { render, screen } from '@testing-library/react'
import Todo from './Todo'

const todo = {
  text: "Yeet",
  done: true,
}

describe('<Todo />', () => {
  test('renders content', async () => {

    render(
      <Todo
        todo={todo}
      />
    )

    const element = await screen.findByText(`${todo.text}`)
    expect(element).toBeDefined()
  })
})