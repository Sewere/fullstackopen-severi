import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newURL, setNewURL] = useState('')

    const handleTitleChange = (event) => {
        console.log(event.target.value)
        setNewTitle(event.target.value)
    }
    const handleAuthorChange = (event) => {
        console.log(event.target.value)
        setNewAuthor(event.target.value)
    }
    const handleURLChange = (event) => {
        console.log(event.target.value)
        setNewURL(event.target.value)
    }

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newURL,
            likes: 0,
        })
        setNewAuthor('')
        setNewTitle('')
        setNewURL('')
    }
    const blogFormStyle = {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      maxWidth: '400px', 
      margin: '0 auto',
      padding: '20px', 
      border: '1px solid #ccc',
      borderRadius: '5px', 
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff'
    }

  return (
    <div>
    <h2>Add a blog</h2>
    <form onSubmit={addBlog} style={blogFormStyle}>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        value={newTitle}
        onChange={handleTitleChange}
      />
  
      <label htmlFor="author">Author</label>
      <input
        id="author"
        type="text"
        value={newAuthor}
        onChange={handleAuthorChange}
      />
  
      <label htmlFor="url">URL</label>
      <input
        id="url"
        type="text"
        value={newURL}
        onChange={handleURLChange}
      />
  
      <button type="submit">Save</button>
    </form>
    </div>
  )
}

export default BlogForm