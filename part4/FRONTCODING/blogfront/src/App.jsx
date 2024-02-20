import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import '../index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    //window.localStorage.removeItem('loggedNoteappUser')
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials!')
      setShowError(true)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setErrorMessage('Logged out.')
    setShowError(true)
    setUser(null)
    setTimeout(() => {
      setErrorMessage(null)
      setShowError(false)
    }, 10000)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

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

  const blogFormStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  }

  const blogForm = () => (
    <div>
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

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newURL,
      likes: 0
    }
    blogService
    .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setErrorMessage(`A new blog: ${newTitle} by ${newAuthor} added.`)
        setShowError(true)
        setNewAuthor('')
        setNewTitle('')
        setNewURL('')
        setTimeout(() => {
          setErrorMessage(null)
          setShowError(false)
        }, 5000)
      })
  }

  const showBlogs = () => {
    return(
      <ul>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </ul>
    )
  }

  if(user === null) {
    return(
      <div>
        <h2>Login please</h2>
        {showError && <Notification message={errorMessage} />}
        {loginForm()}
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      {showError && <Notification message={errorMessage} />}
      <div>
        <p>{user.name} logged in</p>
          {blogForm()}
      </div>
      {showBlogs()}
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default App