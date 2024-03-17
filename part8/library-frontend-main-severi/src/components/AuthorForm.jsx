import { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import Select from 'react-select'

import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const AuthorForm = ({ setError }) => {
  const [selectedAuthor, setSelectedAuthor] = useState(null)
  const [newBorn, setNewBorn] = useState('')

  const { loading, error, data } = useQuery(ALL_AUTHORS)

  const [changeAuthorBorn, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
        const messages = error.graphQLErrors.map(e => e.message).join('\n')
        setError(messages)
    }
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!selectedAuthor || !newBorn) {
      setError('Please select an author and enter a new born year.')
      return
    }

    changeAuthorBorn({ variables: { name: selectedAuthor.value, newBorn } })

    setSelectedAuthor(null)
    setNewBorn('')
  }

  useEffect(() => {
    if (result.data && result.data.editAuthorBorn === null) {
      setError('Author not found')
    }
  }, [result.data])

  const authorOptions = data ? data.allAuthors.map(author => ({
    value: author.name,
    label: author.name
  })) : [];

  return (
    <div>
      <h2>Change Author Born Year</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Select Author:</label>
          <Select
            options={authorOptions}
            value={selectedAuthor}
            onChange={setSelectedAuthor}
            placeholder="Select author..."
          />
        </div>
        <div>
          <label>New Born Year:</label>
          <input
            type="text"
            value={newBorn}
            onChange={({ target }) => setNewBorn(target.value)}
          />
        </div>
        <button type='submit'>Update Birth Year</button>
      </form>
    </div>
  )
}

export default AuthorForm
