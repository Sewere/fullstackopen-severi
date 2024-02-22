import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'
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
  const [showError, setShowError] = useState(false)
  const [loginVisible, setLoginVisible] = useState(false)
  const blogFormRef = useRef()

  useEffect(() => {
    updateBlogs()
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

  const updateBlogs = async () => {
    try {
      const fetchedBlogs = await blogService.getAll()
      fetchedBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(fetchedBlogs)
    } catch (error) {
      console.error('Error fetching blogs:', error)
    }
  }

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

  const addBlog = (blogObject) => {
    if (blogFormRef.current) {
      blogFormRef.current.toggleVisibility()
    }
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setErrorMessage(`A new blog: ${returnedBlog.title} by ${returnedBlog.author} added.`)
        setShowError(true)
        setTimeout(() => {
          setErrorMessage(null)
          setShowError(false)
        }, 5000)
      })
  }
  const blogForm = () => (
    <Toggleable buttonLabel='New Blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Toggleable>
  )

  const showBlogs = () => {
    blogs.sort
    return(
      <ul>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateBlogs={updateBlogs} currentUser={user}/>
        )}
      </ul>
    )
  }

  if(user === null) {
    return(
      <div>
        <h2>Login please</h2>
        {showError && <Notification message={errorMessage} />}
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      {showError && <Notification message={errorMessage} />}
      <div>
        <p>{user.name} logged in</p>
      </div>
      {showBlogs()}
      <button onClick={handleLogout}>Logout</button>
      {blogForm()}
    </div>
  )
  /* malli
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {!user && loginForm()}
      {user && <div>
       <p>{user.name} logged in</p>
       <Togglable buttonLabel="new note">
        <NoteForm
          createNote={addNote}
        />
      </Togglable>
      </div>
     }

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <Footer />
    </div>
  )*/
}

export default App