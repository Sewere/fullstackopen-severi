import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../queries'

const CreateUserForm = ({ setError, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [favoriteGenre, setFavoriteGenre] = useState('')
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER)

  useEffect(() => {
    if (data) {
      const token = data.createUser.token
      setToken(token)
      localStorage.setItem('severi-user-token', token)
    }
  }, [data, setToken])

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await createUser({
        variables: { username, password, favoriteGenre },
      })
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Username:
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          Favorite Genre:
          <input value={favoriteGenre} onChange={(e) => setFavoriteGenre(e.target.value)} />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating User...' : 'Create User'}
        </button>
      </form>
      {error && <p>Error: {error.message}</p>}
    </div>
  )
}

export default CreateUserForm
