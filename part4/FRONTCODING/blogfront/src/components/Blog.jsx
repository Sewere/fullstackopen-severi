import React from 'react'
import Toggleable from './Toggleable'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <strong>{blog.title}</strong>
      <Toggleable buttonLabel="Show Info">
        <div>
          <p>Author: {blog.author}</p>
          <p>URL: {blog.url}</p>
          <p>Likes: {blog.likes}</p>
          <p>User: {blog.user.name}</p>
        </div>
      </Toggleable>
    </div>
  )
}

export default Blog 
