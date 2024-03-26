import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'
import CreateUserForm from './CreateUserForm'

const LoginForm = ({ setLoggedUser, setError, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error)
      if(error.graphQLErrors) setError(error.graphQLErrors.message)
      else setError(error)
    },
 /*   update: (cache, response) => {
        cache.updateQuery({ query: ALL_PERSONS },({ allPersons }) => {
            return {
                allPersons: allPersons.concat(response.data.addPerson),
            }
        })
    },*/
  })


  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      console.log("TÄS TOKENI", token)
      setToken(token)
      localStorage.setItem('severi-user-token', token)
    }
  }, [result.data])

  const submit = async (event) => {
    event.preventDefault()
    setLoggedUser(username)
    login({ variables: { username, password } })
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
      <h3>Create a new user</h3>
      <CreateUserForm setError={setError} setToken={setToken}/>
    </div>
  )
}

export default LoginForm