import { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import AuthorForm from './components/AuthorForm'
import LoginForm from './components/LoginForm'
import FavoriteGenre from './components/FavoriteGenre'

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
  <div style={{color: 'red'}}>
    {errorMessage}
    </div>
  )
}

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [username, setUsername] = useState('')
  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
  
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
    <>
      <Notify errorMessage={errorMessage} />
      <LoginForm setLoggedUser={setUsername} setToken={setToken} setError={notify} />
    </>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={logout}>logout</button>
      </div>
      <Notify errorMessage={errorMessage} />
      <FavoriteGenre username={username}/>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook token={token} setError={notify} show={page === 'add'} />
      <AuthorForm/>
    </div>
  )
}

export default App
