import React from 'react'
import '@testing-library/jest-dom'
import { render, screen  } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog testing', () => {

  const blog = {
    title: 'Titteli',
    author: 'Sepponen',
    url: 'wwwfi',
    likes: 0,
    user: 'Seppo'
  }
  const updateBlogs = jest.fn()
  let container

  beforeEach(() => {
    container = render(
      <Blog blog={blog} updateBlogs={updateBlogs}/>
    ).container
  })

  test('title and author are rendered but other info is not visible', () => {

    //screen.debug()
    const div = container.querySelector('.togglableContent')

    expect(container).toHaveTextContent(blog.title)
    expect(div).toHaveStyle('display: none')

    //screen.debug(element)

    //const { container } = render(<Blog blog={blog} />)
    //const div = container.querySelector('.blog')
    //expect(div).toHaveTextContent('Titteli')

  })

  test('clicking show info shows info', () => {
    expect(screen.queryByText(blog.url)).not.toBeInTheDocument()
    expect(screen.queryByText('Likes:')).not.toBeInTheDocument()
    userEvent.click(screen.getByText('Show Info'))
    expect(screen.getByText(`URL: ${blog.url}`)).toBeInTheDocument()
    expect(screen.getByText('Likes: 0')).toBeInTheDocument()
  })

  test('clicking like twice the event handler the component received as props is called twice', () => {
    //THIS TEST FAILS BECAUSE MY updateBlogs is called inside handleLikes
    const button = container.querySelector('.visible-btn')
    const userShow = userEvent.setup()
    userShow.click(button)

    const likeButton = container.querySelector('.like-btn')
    userShow.click(likeButton)
    userShow.click(likeButton)

    expect(updateBlogs.mock.calls).toHaveLength(2)
  })

})
/*
describe('Blog testing event handler', () => {
  test('clicking like twice the event handler the component received as props is called twice', () => {
    const blog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://example.com',
      likes: 0,
      user: { name: 'Test User' }
    }

    const updateBlogs2 = jest.fn()

    let container = render(
      <Blog blog={blog} updateBlogs={updateBlogs2}/>
    ).container

    const button = screen.getByText('Show Info')
    userEvent.click(button)
    const likeButton = screen.getByText('Like')
    userEvent.click(likeButton)
    userEvent.click(likeButton)

    expect(updateBlogs2).toHaveBeenCalledTimes(2)
  })
})

*/

/*
test('clicking the button calls event handler once', async () => {
  const blog = {
    title: 'Titteli',
    author: 'Sepponen',
    url: 'www.fi',
    likes: 0,
    user: 'Seppo'
  }

  const mockHandler = jest.fn()
  render(
    <Blog blog={blog} toggleImportance={mockHandler} />  )
  const user = userEvent.setup()
  const button = screen.getByText('make not important')
  await user.click(button)
  expect(mockHandler.mock.calls).toHaveLength(1)}
)*/