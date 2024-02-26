import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('test should check, that the form calls the event handler it received as props with the right details when a new blog is created', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const input = screen.getByPlaceholderText('Add title')
  const sendButton = screen.getByText('Save')

  await user.type(input, 'testing a form...')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'testing a form...',
    author: '',
    likes: 0,
    url: ''
  })
})