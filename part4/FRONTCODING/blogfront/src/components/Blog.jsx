import React from 'react'
import Toggleable from './Toggleable'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    try {
      const modifiedBlog = { ...blog, likes: blog.likes + 1 }
      const updatedBlog = await blogService.update(modifiedBlog.id, modifiedBlog)
      updateBlogs()
    } catch (error) {
      console.error('Error liking blog:', error)
    }
  }

  return (
    <div style={blogStyle}>
      <strong>{blog.title}</strong>
      <Toggleable buttonLabel="Show Info">
        <div>
          <p>Author: {blog.author}</p>
          <p>URL: {blog.url}</p>
          <p>Likes: {blog.likes}</p><button onClick={handleLike}> Like</button>
          <p>User: {blog.user.name}</p>
        </div>
      </Toggleable>
    </div>
  )
}

export default Blog 
